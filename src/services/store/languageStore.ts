import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "ua" | "de" | string;
type LanguageInterface = {
  selectedLanguage: Language;
  setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageInterface>()(
  persist(
    (set) => ({
      selectedLanguage: "en",
      setLanguage: (l) => set({ selectedLanguage: l }),
    }),
    {
      name: "selected-language",
    }
  )
);

export default useLanguageStore;
