import React, { useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { IoAttach } from "react-icons/io5";
import InputEmoji from "react-input-emoji";
import useSendMessage from "../../hooks/useSendMessage";
import useUploadFile from "../../hooks/useUploadFile"; // Import the new hook

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading: sendingMessage, sendMessage } = useSendMessage(); // Rename loading to avoid clash
  const { loading: uploadingFile, uploadFile } = useUploadFile(sendMessage); // Call the hook, pass sendMessage
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  const handleEnter = async (text) => {
    if (!text.trim()) return;
    await sendMessage(text);
    setMessage("");
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
      uploadFile(file); // Call the upload function from the hook
    }
    // Reset file input value to allow selecting the same file again
    if (event.target) {
      event.target.value = null;
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-2 sm:p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-dark-200 bg-opacity-80 backdrop-blur-sm p-2 sm:p-3 rounded-full mx-1 sm:mx-3 my-1 border border-gray-700/50 shadow-md hover:border-gray-600/70 transition-all duration-200">
        {/* File attachment button with improved styling */}
        <button 
          type="button" 
          className="p-2 rounded-full hover:bg-dark-300/50 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center"
          onClick={triggerFileSelect}
          disabled={uploadingFile}
          title="Attach file"
        >
          {uploadingFile ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <IoAttach className="text-xl" />
          )}
        </button>
        
        {/* Message input with better fit */}
        <div className="flex-1 min-w-0">
          <InputEmoji
            value={message}
            onChange={setMessage}
            cleanOnEnter
            onEnter={handleEnter}
            placeholder="Type a message..."
            theme="dark"
            borderRadius={20}
            borderColor="transparent"
            fontSize={14}
            className="w-full"
          />
        </div>
        
        {/* Enhanced send button */}
        <button
          type="submit"
          className="p-2.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white flex items-center justify-center shadow-md hover:shadow-lg hover:from-primary-500 hover:to-primary-400 transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 disabled:from-primary-600/70 disabled:to-primary-500/70"
          disabled={sendingMessage || uploadingFile || !message.trim()}
          title="Send message"
        >
          {sendingMessage ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <IoSend className="text-lg" />
          )}
        </button>
      </form>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        accept="image/*,video/*,.pdf,.doc,.docx,.txt"
      />
    </div>
  );
};

export default MessageInput;
