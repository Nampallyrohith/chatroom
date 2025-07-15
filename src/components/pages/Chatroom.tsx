import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import type { Message } from "../../models/typeDefinitions";
import { toast } from "sonner";
import Loader from "../../shared/Loader";
import { SendHorizonal } from "lucide-react";
import { FileUpload } from "../../shared/FileUpload";

const Chatroom = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    if (!id) return;
    const stored = localStorage.getItem(`chat-${id}`);
    if (stored) {
      try {
        const parsed: Message[] = JSON.parse(stored);
        setMessages(parsed);
        setTimeout(() => setLoading(false), 500);
      } catch (e) {
        console.error("Failed to parse messages from localStorage", e);
      }
    }
    setHasLoaded(true);
  }, [id]);

  useEffect(() => {
    if (!id || !hasLoaded) return;
    console.log("messages:", messages);
    localStorage.setItem(`chat-${id}`, JSON.stringify(messages));
  }, [messages, id, hasLoaded]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) {
      alert("Enter message");
      return;
    }
    console.log(selectedImage);
    const userMsg = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
      timestamp: new Date().toLocaleTimeString(),
      image: selectedImage || undefined,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    toast.success("Message sent!");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: "ai" as const,
        content: `Gemini says: ${input}`,
        timestamp: new Date().toLocaleTimeString(),
        image: selectedImage || undefined,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setSelectedImage(null);
      setIsTyping(false);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white relative">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700 font-bold text-lg">
        Chatroom: {id}
      </header>

      <div className="flex flex-col w-full h-full overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-2 text-gray-600 dark:text-gray-300">
                Welcome to Gemini 👋
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                You can start a conversation by asking anything.
                <br />
                Gemini can respond to text and also support image sharing.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`group relative p-2 rounded-md max-w-xs flex flex-col cursor-pointer ${
                msg.role === "user"
                  ? "bg-blue-100 dark:bg-blue-300 self-end"
                  : "bg-gray-200 dark:bg-gray-700 self-start"
              }`}
              onClick={() => copyToClipboard(msg.content)}
            >
              <p>{msg.content}</p>
              {msg.image && (
                <img
                  src={msg.image}
                  alt="uploaded"
                  className="w-40 h-auto mt-2 rounded-md border"
                />
              )}
              <span className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                {msg.timestamp}
              </span>
              {/* Hover message */}
              <span className="absolute -top-5 right-0 text-xs text-gray-400 hidden group-hover:block">
                Click to copy
              </span>
            </div>
          ))
        )}

        {isTyping && (
          <p className="text-sm text-gray-400 dark:text-gray-300">
            Gemini is typing...
          </p>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-4 w-full flex-wrap sticky bottom-0 border-t h-20 border-gray-200 dark:border-gray-700 flex items-center gap-2 bg-white dark:bg-gray-900">
        <input
          className="flex-1 border border-gray-300 h-full dark:border-gray-600 rounded px-2 bg-white dark:bg-gray-800 text-black dark:text-white"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <FileUpload handleImageUpload={handleImageUpload} />

        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition"
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatroom;
