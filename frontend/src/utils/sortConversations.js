// filepath: c:\Users\Admin\Desktop\chatterbox\frontend\src\utils\sortConversations.js

/**
 * Sort conversations with most recent activity at the top
 * This is a helper function to ensure consistent conversation ordering
 * throughout the application
 */
export const sortConversationsByRecent = (conversations) => {
  // We assume conversations are already sorted by the backend
  // but if you ever need additional sorting logic, add it here
  return [...conversations];
};
