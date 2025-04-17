import React, { useEffect, useState } from "react";

import { useSocketContext } from "../context/socketContext";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import notificationSound from "../assets/sounds/notification.mp3";
import { makeRequest } from "../utils/api";
import toast from "react-hot-toast";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const [conversations, setConversations] = useState([]);

  // Load initial conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await makeRequest("/conversations");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    
    if (authUser?._id) {
      getConversations();
    }
  }, [authUser?._id]);  useEffect(() => {
    socket?.on("newMessage", async (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();
      
      // Process message for current conversation
      if (selectedConversation?._id === newMessage.senderId || 
          selectedConversation?._id === newMessage.receiverId) {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
      }
      
      // Always check if this is a new conversation that needs to be added
      const senderId = newMessage.senderId;
      const receiverId = newMessage.receiverId;
      
      // Always trigger a refresh of the conversations list to update ordering
      // This ensures the conversation with new activity moves to the top
      window.dispatchEvent(new CustomEvent('new-conversation', { 
        detail: { isRefresh: true } 
      }));
      
      // If the user is the receiver, and the conversation isn't in the list yet
      if (receiverId === authUser?._id) {
        const isExistingConversation = conversations.some(conv => conv._id === senderId);
        
        if (!isExistingConversation) {
          // Fetch updated conversation list
          try {
            const res = await makeRequest("/conversations");
            const data = await res.json();
            if (data.error) {
              throw new Error(data.error);
            }
            setConversations(data);
            
            // Find the sender's info from the updated conversation list
            const sender = data.find(c => c._id === senderId);
            
            // Show a notification with the sender's name
            toast.success(`New message from ${sender?.fullName || "someone"}`, {
              duration: 5000,
              icon: '💬'
            });
            
            // Force refresh of sidebar conversations via custom event
            window.dispatchEvent(new CustomEvent('new-conversation', {
              detail: { senderId, isNew: true }
            }));
          } catch (error) {
            console.error("Error refreshing conversations after new message:", error);
          }
        } else {
          // Even if conversation exists, we should still refresh the sidebar for ordering
          window.dispatchEvent(new CustomEvent('new-conversation'));
        }
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages, selectedConversation, authUser?._id, conversations]);

  return { conversations };
};

export default useListenMessages;
