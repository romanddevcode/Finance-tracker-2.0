export interface UIState {
  isModalOpen: boolean;
  toggleModal: () => void;
}
export type Theme = "light" | "dark";

export interface ThemeState {
  themeController: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}
