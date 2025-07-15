// src/components/DarkModeToggle.tsx
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)} className="text-sm px-3 py-1 cursor-pointer">
      {dark ? "🌙" : "☀️"}
    </button>
  );
};

export default DarkModeToggle;
