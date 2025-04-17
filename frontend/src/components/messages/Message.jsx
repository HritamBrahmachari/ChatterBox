import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useThemeContext } from "../../context/ThemeContext";
import useConversation from "../../zustand/useConversation";
import { formatTime } from "../../utils/helpers";


// Determine backend server base URL (remove /api suffix)
const isProduction = window.location.hostname !== 'localhost';
const API_BASE_URL = isProduction
  ? 'https://real-time-chat-application-chatterbox.onrender.com/api'
  : '/api'; // Using relative path for dev assumes frontend and backend are served from the same origin or proxied
const SERVER_BASE_URL = API_BASE_URL.replace('/api', '');

// Helper function to check if a string is an image URL/path
const isImagePath = (path) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(path);

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const isSender = message.senderId === authUser._id;
  const shakeClass = message.shouldShake ? "shake" : "";
  
  // Get message content, handling both formats
  const messageContent = message.text || message.message || "";
  
  // Format time
  const formattedTime = formatTime(message.createdAt);

  // Function to render message content (text or file)
  const renderMessageContent = () => {
    if (messageContent && messageContent.startsWith("/uploads/")) {
      const filePath = messageContent;
      // Construct full URL. Handle relative path in dev.
      const fileUrl = isProduction ? `${SERVER_BASE_URL}${filePath}` : filePath;
      const fileName = filePath.split('/').pop(); // Extract filename

      if (isImagePath(filePath)) {
        // Render image with responsive sizing
        return (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="block">
            <img
              src={fileUrl}
              alt={fileName}
              className="max-w-[200px] xs:max-w-[250px] sm:max-w-xs max-h-64 rounded-lg object-contain my-2"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                console.error('Image failed to load:', fileUrl);
              }}
            />
          </a>
        );
      } else {
        // Render download link for other files with file icon and better formatting
        return (
          <div className="file-attachment flex items-center py-1">
            <div className="file-icon mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" // Using Tailwind classes for size
        fill="currentColor" 
        viewBox="0 0 16 16">
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707L9.293 0zM9 1.5V5a.5.5 0 0 0 .5.5H13v7.5a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5h5z" />
              </svg>
            </div>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer" 
              download={fileName}
              className="text-blue-400 hover:text-blue-500 underline text-sm break-all"
            >
              {fileName.length > 20 ? `${fileName.substring(0, 20)}...` : fileName}
            </a>
          </div>
        );
      }
    }
    // Render plain text with word-wrap for long messages
    return <span className="break-words">{messageContent}</span>;
  };

  return (
    <div className={`message ${isSender ? "message-sent" : "message-received"} ${shakeClass}`}>
      <div className="message-text">{renderMessageContent()}</div>
      <div className="message-time text-[10px] sm:text-xs">{formattedTime}</div>
    </div>
  );
};

export default Message;
