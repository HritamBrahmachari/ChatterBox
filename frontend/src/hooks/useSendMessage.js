import React from "react";
import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const isProduction = window.location.hostname !== 'localhost';
      const apiUrl = isProduction
        ? `https://real-time-chat-application-chatterbox.onrender.com/api/messages/send/${selectedConversation._id}`
        : `/api/messages/send/${selectedConversation._id}`;

      const res = await fetch(apiUrl, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
      
      // Trigger sidebar update for the sender
      window.dispatchEvent(new CustomEvent('new-conversation', {
        detail: { 
          recipientId: selectedConversation._id,
          isNew: false,
          fromSender: true 
        }
      }));
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
