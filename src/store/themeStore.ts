import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme, ThemeState, UIState } from "../types/themeInterface";

export const useUIStore = create<UIState>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((s) => ({ isModalOpen: !s.isModalOpen })),
}));

// Theme store with persist
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeController: "light",
      toggleTheme: () =>
        set((state) => ({
          themeController: state.themeController === "light" ? "dark" : "light",
        })),
      setTheme: (t: Theme) => set({ themeController: t }),
    }),
    {
      name: "theme-storage", // key in localStorage
    }
  )
);
