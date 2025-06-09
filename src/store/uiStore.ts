import { create } from "zustand";

interface UIState {
  isModalOpen: boolean;
  toggleModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((s) => ({ isModalOpen: !s.isModalOpen })),
}));

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
  setTheme: (t: Theme) => set({ theme: t }),
}));
