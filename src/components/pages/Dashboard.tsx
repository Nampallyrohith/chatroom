import { SearchIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../../shared/Loader";

const Dashboard = () => {
  const [chatrooms, setChatrooms] = useState<string[]>([]);
  const [filteredChatrooms, setFilteredChatrooms] = useState<string[]>([]);
  const [newChatroom, setNewChatroom] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Load chatrooms from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chatrooms");
    if (saved) {
      const parsed = JSON.parse(saved);
      setChatrooms(parsed);
      setFilteredChatrooms(parsed);
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  // Filter chatrooms when search is debounced
  useEffect(() => {
    const filtered = chatrooms.filter((c) =>
      c.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setFilteredChatrooms(filtered);
  }, [debouncedSearch, chatrooms]);

  const createChatroom = () => {
    if (!newChatroom.trim()) return;
    const updated = [...chatrooms, newChatroom];
    setChatrooms(updated);
    setFilteredChatrooms(updated);
    localStorage.setItem("chatrooms", JSON.stringify(updated));
    setNewChatroom("");
    toast.success("Chatroom created 🎉");
  };

  const deleteChatroom = (title: string) => {
    const updated = chatrooms.filter((c) => c !== title);
    setChatrooms(updated);
    setFilteredChatrooms(updated);
    localStorage.setItem("chatrooms", JSON.stringify(updated));
    toast.success("Deleted Chatroom.");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-screen px-4 py-8 bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-xl mx-auto backdrop-blur-md bg-white/80 dark:bg-white/5 rounded-xl shadow-lg p-6 transition">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-6 text-center">
          💬 Your Chatrooms
        </h2>

        {/* New Chatroom Input */}
        <div className="flex gap-2 mb-4">
          <input
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white p-2 flex-1 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
            placeholder="New chatroom title"
            value={newChatroom}
            onChange={(e) => setNewChatroom(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded shadow hover:brightness-110 transition"
            onClick={createChatroom}
          >
            Create
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <SearchIcon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300"
          />
          <input
            type="text"
            placeholder="Search chatrooms..."
            className="w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Chatroom List */}
        <ul className="space-y-3">
          {filteredChatrooms.map((title) => (
            <li
              key={title}
              className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded shadow hover:shadow-md transition"
            >
              <Link
                to={`/chatroom/${encodeURIComponent(title)}`}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base"
              >
                {title}
              </Link>
              <button
                onClick={() => {
                  deleteChatroom(title);
                  localStorage.removeItem(`chat-${title}`);
                }}
                className="text-red-500 hover:text-red-600 transition"
              >
                <Trash size={16} />
              </button>
            </li>
          ))}

          {filteredChatrooms.length === 0 && (
            <li className="text-gray-500 dark:text-gray-400 text-center py-6">
              No chatrooms found 😕
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
