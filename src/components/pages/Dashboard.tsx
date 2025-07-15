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
    <div className="p-6 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Chatrooms</h2>

        {/* New Chatroom Input */}
        <div className="flex gap-2 mb-4">
          <input
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 flex-1 rounded"
            placeholder="New chatroom title"
            value={newChatroom}
            onChange={(e) => setNewChatroom(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={createChatroom}
          >
            Create
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <SearchIcon
            size={30}
            className="absolute inset-y-0 left-0 top-1.5 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-300"
          />

          <input
            type="text"
            placeholder="Search chatrooms..."
            className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Chatroom List */}
        <ul className="space-y-2">
          {filteredChatrooms.map((title) => (
            <li
              key={title}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 flex justify-between items-center rounded"
            >
              <Link
                to={`/chatroom/${encodeURIComponent(title)}`}
                className="hover:underline"
              >
                {title}
              </Link>
              <button
                onClick={() => {
                  deleteChatroom(title);
                  localStorage.removeItem(`chat-${title}`);
                }}
                className="text-red-500 hover:underline cursor-pointer"
              >
                <Trash size={15} />
              </button>
            </li>
          ))}

          {filteredChatrooms.length === 0 && (
            <li className="text-gray-400 dark:text-gray-500 text-sm text-center">
              No chatrooms found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
