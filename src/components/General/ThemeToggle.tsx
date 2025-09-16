// components/ThemeToggle.tsx
import { useThemeStore } from "../../services/store/themeStore";
import React from "react";

interface ThemeToggleProps {
  isSidebarOpen: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isSidebarOpen }) => {
  const { themeController, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={`px-2 py-2 bg-purple-500 rounded  ${
        isSidebarOpen ? "w-14" : "w-fit"
      }`}
    >
      {themeController === "light" ? "☀️ " : "🌙"}
    </button>
  );
};

export default ThemeToggle;
