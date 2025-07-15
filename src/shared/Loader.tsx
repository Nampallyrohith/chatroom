import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen w-full flex flex-col justify-center items-center">
      <Loader2 className="animate-spin h-10 w-10  text-gray-500" />
      <p className="text-black dark:text-white">Loading....</p>
    </div>
  );
};

export default Loader;
