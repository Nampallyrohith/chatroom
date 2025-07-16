import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <Loader2 className="animate-spin h-12 w-12 text-blue-500 dark:text-blue-400 mb-4" />
      <p className="text-lg bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
