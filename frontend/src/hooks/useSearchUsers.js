import { useState } from "react";
import toast from "react-hot-toast";

const useSearchUsers = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchUsers = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 3) {
      setSearchResults([]);
      return;
    }
    
    setLoading(true);
    try {
      const isProduction = window.location.hostname !== 'localhost';
      const apiUrl = isProduction
        ? `https://real-time-chat-application-chatterbox.onrender.com/api/users/search?name=${searchTerm}`
        : `/api/users/search?name=${searchTerm}`;

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
      
      setSearchResults(data);
    } catch (error) {
      toast.error(error.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { loading, searchResults, searchUsers };
};

export default useSearchUsers;