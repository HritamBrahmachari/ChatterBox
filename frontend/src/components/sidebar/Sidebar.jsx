import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SerachInput";
import { useAuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { authUser } = useAuthContext();
  
  return (    <div className="sidebar-container flex flex-col w-full h-full md:min-w-[260px] md:w-auto">
      <div className="pt-12 px-3 pb-3 sm:p-4 border-b border-gray-700 md:pt-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-white">Chats</h2>
            <div className="text-sm text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full hidden sm:block">{authUser?.username}</div>
          </div>
        </div>
        <SearchInput />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Conversations />
      </div>
      <div className="p-2 sm:p-3 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <LogoutButton />
          <div className="block sm:hidden">
            <span className="text-xs text-gray-400">{authUser?.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
