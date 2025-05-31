import React from "react";
import Conversation from "./Conversation";
import ChatterBoxSystem from "./ChatterBoxSystem";
import { getRandomEmoji } from "../../utils/emojis";
import useGetConversations from "../../hooks/useGetConversations";
import useAuthStore from "../../zustand/useAuthStore";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="flex flex-col gap-2 h-full overflow-auto">
      {/* ChatterBox System is always shown */}
      <div className="mb-2">
        <ChatterBoxSystem />
      </div>
      
      {/* Divider */}
      {conversations.length > 0 && (
        <div className="border-b border-gray-700 my-2 mx-3"></div>
      )}

      {/* User's conversations */}
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : conversations.length === 0 ? (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
          Search for users to start chatting
        </p>
      ) : (
        // Sort conversations by most recent activity at the top
        // Note: This assumes conversations are returned with most recent first
        // If server doesn't sort them, this will ensure newest are at the top
        [...conversations].map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;
