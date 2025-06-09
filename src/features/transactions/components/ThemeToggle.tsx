// components/ThemeToggle.tsx
import { useThemeStore } from "../../../store/uiStore";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-300 dark:bg-gray-800 text-black dark:text-white rounded"
    >
      {theme === "light" ? "🌙 Тёмная тема" : "☀️ Светлая тема"}
    </button>
  );
};

export default ThemeToggle;
