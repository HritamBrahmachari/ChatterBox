import React, { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/socketContext";
import { getInitials } from "../../utils/helpers";
import { BsChatDotsFill } from "react-icons/bs";

const MessageContainer = ({ toggleSidebar }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  
  const isOnline = selectedConversation && !selectedConversation.isSystem && onlineUsers.includes(selectedConversation._id);
  const isSystem = selectedConversation?.isSystem;
  
  useEffect(() => {
    // cleanup function to reset the state (unmounting)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
    return (
    <div className="message-content flex-1 flex flex-col h-full">
      {!selectedConversation ? (
        <NoChatSelected toggleSidebar={toggleSidebar} />
      ) : (
        <>          {/* Header - improved for mobile */}
          <div className="flex items-center px-3 sm:px-4 py-3 border-b border-gray-700 shadow-sm flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 w-full pl-11 md:pl-0">              
              <div className="relative">
                {isSystem ? (
                  <div className="user-avatar-initials bg-gradient-to-r from-primary-600 to-primary-400">
                    <BsChatDotsFill className="text-white text-sm" />
                  </div>
                ) : (
                  <div className="user-avatar-initials">
                    {getInitials(selectedConversation.fullName)}
                  </div>
                )}
                {isOnline && (
                  <span className="online-indicator"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white truncate text-sm sm:text-base">
                  {selectedConversation.fullName}
                </h3>
                <p className="text-xs text-gray-400 truncate">
                  {isSystem ? "System Bot" : isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>
            {/* Messages - takes flex-1 to fill available space */}
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>
          
          {/* Input - fixed at bottom, hidden for system chat */}
          {!isSystem && <MessageInput />}
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = ({ toggleSidebar }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-3 sm:px-4">
      <div className="text-center text-gray-300 max-w-md p-4 sm:p-6 glass-card-dark">
        <div className="flex justify-center mb-4">
          <TiMessages className="text-4xl sm:text-5xl text-primary-400" />
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Welcome to ChatterBox</h2>
        <p className="mb-4 text-sm sm:text-base">Select a conversation to start chatting or search for users to connect with!</p>
        <p className="text-xs sm:text-sm text-gray-400">Your messages are end-to-end encrypted</p>
      </div>
    </div>
  );
};
