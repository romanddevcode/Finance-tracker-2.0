// components/ThemeToggle.tsx
import { useThemeStore } from "../../store/themeStore";

const ThemeToggle = () => {
  const { themeController, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="px-2 py-2 bg-purple-500 dark:bg-purple-700  rounded"
    >
      {themeController === "light" ? "☀️ " : "🌙"}
    </button>
  );
};

export default ThemeToggle;
