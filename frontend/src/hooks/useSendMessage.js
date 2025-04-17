import React from "react";
import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { makeRequest } from "../utils/api";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await makeRequest(`/messages/send/${selectedConversation._id}`, {
        method: "POST",
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
