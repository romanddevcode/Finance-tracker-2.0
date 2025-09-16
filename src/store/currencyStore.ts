import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrencyControl } from "../types/currencyControl";

export const useCurrencyStore = create<CurrencyControl>()(
  persist(
    (set) => ({
      selectedCurrency: "EUR",
      setCurrency: (currency) => set({ selectedCurrency: currency }),
    }),
    {
      name: "selected-currency",
    }
  )
);
