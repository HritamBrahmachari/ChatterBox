import { IoSearchSharp } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import useConversation from "../../zustand/useConversation";
import useSearchUsers from "../../hooks/useSearchUsers";
import toast from "react-hot-toast";
import { getInitials } from "../../utils/helpers";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { setSelectedConversation } = useConversation();
  const { loading, searchResults, searchUsers } = useSearchUsers();
  const searchContainerRef = useRef(null);
  const lastSearchTermRef = useRef(""); // Track the last searched term

  // Handle outside click to close search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search as user types
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length >= 3 && search !== lastSearchTermRef.current) {
        // Only search if term is different from last search
        lastSearchTermRef.current = search;
        searchUsers(search);
        setShowResults(true);
      } else if (search.length === 0) {
        setShowResults(false);
        lastSearchTermRef.current = "";
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, searchUsers]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }
    if (search !== lastSearchTermRef.current) {
      lastSearchTermRef.current = search;
      searchUsers(search);
    }
    setShowResults(true);
  };

  const handleSelectUser = (user) => {
    setSelectedConversation(user);
    setSearch("");
    setShowResults(false);
    lastSearchTermRef.current = "";
  };

  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search users..."
          className="search-input w-full text-sm sm:text-base px-3 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => search.length >= 3 && setShowResults(true)}
        />
        <button 
          type="submit" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <IoSearchSharp className="text-lg" />
        </button>
      </form>

      {/* Search Results Dropdown - improved mobile styling */}
      {showResults && (
        <div className="absolute z-10 mt-1 w-full bg-dark-100 bg-opacity-95 backdrop-blur-md border border-gray-700 rounded-md shadow-lg py-1 max-h-[50vh] sm:max-h-60 overflow-auto">
          {loading ? (
            <div className="flex justify-center p-4">
              <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-3 text-sm text-gray-400 text-center">
              {search.length >= 3 ? "No users found" : "Type at least 3 characters to search"}
            </div>
          ) : (
            searchResults.map(user => (
              <div
                key={user._id}
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center gap-3"
                onClick={() => handleSelectUser(user)}
              >
                <div className="user-avatar-initials w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm flex-shrink-0">
                  {getInitials(user.fullName)}
                </div>
                <div className="overflow-hidden">
                  <p className="text-white text-sm sm:text-base truncate">{user.fullName}</p>
                  <p className="text-xs text-gray-400 truncate">{user.username}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
