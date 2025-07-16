export const MessageSkeleton = ({ isUser }: { isUser: boolean }) => {
  return (
    <div
      className={`p-2 rounded-md max-w-xs animate-pulse ${
        isUser
          ? "self-end bg-blue-100"
          : "self-start bg-gray-300 dark:bg-gray-700"
      }`}
    >
      <div className="h-4 w-28 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
    </div>
  );
};
