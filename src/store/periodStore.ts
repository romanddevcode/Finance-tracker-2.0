import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DateControlInterface } from "../features/transactions/types/dateControl";

export const periodStore = create<DateControlInterface>()(
  persist(
    (set) => ({
      period: "week",
      setPeriod: (period) => set({ period: period }),
    }),
    {
      name: "selected-period",
    }
  )
);
