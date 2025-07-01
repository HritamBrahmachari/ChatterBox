import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import useSocketStore from "../zustand/useSocketStore";
import useAuthStore from "../zustand/useAuthStore";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const socket = useSocketStore((state) => state.socket);
  const authUser = useAuthStore((state) => state.authUser);
  const { messages, setMessages, selectedConversation } = useConversation();

  // Fetch conversations from backend
  const fetchConversations = useCallback(async () => {
    if (!authUser?._id) return;
    
    setLoading(true);
    try {
      const isProduction = window.location.hostname !== 'localhost';
      const apiUrl = isProduction
        ? 'https://real-time-chat-application-chatterbox.onrender.com/api/conversations'
        : '/api/conversations';

      const res = await fetch(apiUrl, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setConversations(data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [authUser?._id]);

  // Initial load
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Handle real-time messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // Play notification sound
      const sound = new Audio(notificationSound);
      sound.play().catch(() => {}); // Ignore errors if sound fails
      
      // Update current conversation messages if viewing this conversation
      if (selectedConversation?._id === newMessage.senderId || 
          selectedConversation?._id === newMessage.receiverId) {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
      }
      
      // Refresh conversations to update order and add new ones
      fetchConversations();
      
      // Show toast for new messages when not in the conversation
      const isCurrentConversation = selectedConversation?._id === newMessage.senderId || 
                                   selectedConversation?._id === newMessage.receiverId;
      
      if (!isCurrentConversation && newMessage.receiverId === authUser?._id) {
        toast.success(`New message received`, {
          duration: 3000,
          icon: '💬'
        });
      }
    };

    socket.on("newMessage", handleNewMessage);
    
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedConversation, messages, setMessages, authUser?._id, fetchConversations]);

  return {
    loading,
    conversations,
    refreshConversations: fetchConversations
  };
};

export default useConversations;
