import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [chatrooms, setChatrooms] = useState<string[]>([]);
  const [newChatroom, setNewChatroom] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("chatrooms");
    if (saved) setChatrooms(JSON.parse(saved));
  }, []);

  const createChatroom = () => {
    if (!newChatroom) return;
    const updated = [...chatrooms, newChatroom];
    setChatrooms(updated);
    localStorage.setItem("chatrooms", JSON.stringify(updated));
    setNewChatroom("");
  };

  const deleteChatroom = (title: string) => {
    const updated = chatrooms.filter((c) => c !== title);
    setChatrooms(updated);
    localStorage.setItem("chatrooms", JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Chatrooms</h2>
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

        <ul className="space-y-2">
          {chatrooms.map((title) => (
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
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
