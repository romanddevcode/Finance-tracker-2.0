// components/ThemeToggle.tsx
import { useThemeStore } from "../../../store/uiStore";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="px-2 py-2 bg-purple-500 dark:bg-purple-700  rounded"
    >
      {theme === "light" ? "☀️ " : "🌙"}
    </button>
  );
};

export default ThemeToggle;
