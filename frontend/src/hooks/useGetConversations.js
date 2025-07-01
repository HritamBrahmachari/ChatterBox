import useConversations from "./useConversations";

const useGetConversations = () => {
  const { loading, conversations, refreshConversations } = useConversations();
  
  return { loading, conversations, refreshConversations };
};

export default useGetConversations;
