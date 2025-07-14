import { create } from "zustand";
import type {
  Theme,
  ThemeState,
  UIState,
} from "../features/transactions/types/themeInterface";

export const useUIStore = create<UIState>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((s) => ({ isModalOpen: !s.isModalOpen })),
}));

export const useThemeStore = create<ThemeState>((set) => ({
  themeController: "light",
  toggleTheme: () =>
    set((state) => ({
      themeController: state.themeController === "light" ? "dark" : "light",
    })),
  setTheme: (t: Theme) => set({ themeController: t }),
}));
