import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      try {
        const isProduction = window.location.hostname !== 'localhost';
        const apiUrl = isProduction
          ? `https://real-time-chat-application-chatterbox.onrender.com/api/messages/${selectedConversation._id}`
          : `/api/messages/${selectedConversation._id}`;

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
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation._id, setMessages]);
  return { messages, loading };
};

export default useGetMessages;
