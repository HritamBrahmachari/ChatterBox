import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { makeRequest } from "../utils/api";
import useSocketStore from "../zustand/useSocketStore";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const socket = useSocketStore((state) => state.socket);

  const getConversations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await makeRequest("/conversations");
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // Set conversations directly from the backend result
      // Backend is already sorting by most recent first
      setConversations(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load of conversations
  useEffect(() => {
    getConversations();
  }, [getConversations]);
  
  // Listen for socket events that would require refreshing the conversation list
  useEffect(() => {
    // Add custom event listener for new conversations (triggered by useListenMessages)
    const handleNewConversation = () => {
      getConversations();
    };
    
    window.addEventListener('new-conversation', handleNewConversation);
    
    // Also listen for newMessage events to refresh conversations as needed
    socket?.on("newMessage", () => {
      getConversations();
    });
    
    return () => {
      window.removeEventListener('new-conversation', handleNewConversation);
      socket?.off("newMessage");
    };
  }, [socket, getConversations]);
  
  return { loading, conversations, refreshConversations: getConversations };
};

export default useGetConversations;
