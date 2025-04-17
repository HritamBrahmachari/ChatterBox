import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      // Use direct hostname detection instead of relying on environment variables
      const isProduction = window.location.hostname !== 'localhost';
      const socketUrl = isProduction
        ? 'https://real-time-chat-application-chatterbox.onrender.com'
        : 'http://localhost:5000';
      
      console.log("Connecting to socket at:", socketUrl);
      console.log("Is production environment:", isProduction);
      
      const socket = io(socketUrl, {
        query: {
          userId: authUser._id,
        },
        withCredentials: true,
        transports: ['websocket', 'polling']
      });

      socket.on('connect', () => {
        console.log('Socket connected successfully with ID:', socket.id);
      });

      socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message);
      });

      setSocket(socket);
      
      socket.on("getOnlineUsers", (users) => {
        console.log("Online users received:", users);
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
