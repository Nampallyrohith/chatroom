import DarkModeToggle from "./DarkModeToggle ";

const Header = () => {
  return (
    <nav className="flex sticky top-0 justify-between items-center p-4 border-b bg-white dark:bg-gray-900 dark:text-white">
      <h1 className="text-lg font-bold">Gemini Chat</h1>
      <DarkModeToggle />
    </nav>
  );
};

export default Header;
