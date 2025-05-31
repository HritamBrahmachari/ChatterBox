import { create } from "zustand";
import io from "socket.io-client";

const useSocketStore = create((set, get) => ({
  // Socket instance
  socket: null,
  
  // List of online users
  onlineUsers: [],
  
  // Initialize the socket connection
  initSocket: (userId) => {
    if (!userId) return;
    
    // Close existing socket if any
    const { socket } = get();
    if (socket) socket.close();
    
    // Determine server URL based on environment
    const isProduction = window.location.hostname !== 'localhost';
    const socketUrl = isProduction
      ? 'https://real-time-chat-application-chatterbox.onrender.com'
      : 'http://localhost:5000';
    
    console.log("Connecting to socket at:", socketUrl);
    console.log("Is production environment:", isProduction);
    
    // Create new socket connection
    const newSocket = io(socketUrl, {
      query: { userId },
      withCredentials: true,
      transports: ['websocket', 'polling']
    });
    
    // Set up socket event listeners
    newSocket.on('connect', () => {
      console.log('Socket connected successfully with ID:', newSocket.id);
    });
    
    newSocket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });
    
    newSocket.on("getOnlineUsers", (users) => {
      console.log("Online users received:", users);
      set({ onlineUsers: users });
    });
    
    // Update the store with the new socket
    set({ socket: newSocket });
    
    return newSocket;
  },
  
  // Clean up the socket connection
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));

export default useSocketStore;
