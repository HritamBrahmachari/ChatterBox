import { useState, useEffect } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { selectedConversation } = useConversation();
  
  // Auto-hide sidebar on small screens when conversation is selected
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        if (selectedConversation) {
          setShowSidebar(false);
        }
      } else {
        setShowSidebar(true);
      }
    };
    
    handleResize(); // Run initially
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedConversation]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };
  
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-0 sm:p-2 md:p-4">
      <div className="chat-container w-full flex h-[100vh] sm:h-[95vh] overflow-hidden relative">        {/* Mobile menu button - only visible when sidebar is hidden */}
        {!showSidebar && (
          <button 
            onClick={toggleSidebar}
            className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-full bg-dark-100 bg-opacity-70 text-white shadow-lg"
            aria-label="Show sidebar"
          >
            <HiMenuAlt2 size={22} />
          </button>
        )}
        
        {/* Sidebar with improved mobile animation */}
        <div 
          className={`${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } transform transition-transform duration-300 ease-in-out md:translate-x-0 fixed md:relative inset-y-0 left-0 z-40 md:z-auto w-full md:w-auto max-w-full md:max-w-[300px]`}
        >
          {/* Close button inside sidebar - only visible on mobile, positioned in the top-right corner */}
          {showSidebar && (
            <button 
              onClick={toggleSidebar}
              className="md:hidden absolute top-3 right-3 z-50 p-2 rounded-full bg-dark-100 bg-opacity-70 text-white shadow-lg"
              aria-label="Close sidebar"
            >
              <IoClose size={22} />
            </button>
          )}
          
          <Sidebar />
        </div>
        
        {/* Message container - improved for mobile */}
        <div className={`flex-1 ${!showSidebar ? "w-full" : "hidden md:flex"} flex-col`}>
          <MessageContainer toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </div>
  );
};

export default Home;
