import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle ";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <nav className="flex justify-around items-center px-6 py-4 sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <Link
        to="/dashboard"
        className="text-xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent animate-pulse tracking-tight"
      >
        Gemini Chatroom
      </Link>

      <div className="flex items-center gap-4">
        <DarkModeToggle />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm cursor-pointer text-red-500 hover:text-red-600 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
