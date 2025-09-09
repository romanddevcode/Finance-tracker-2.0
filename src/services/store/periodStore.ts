import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DateControlInterface } from "../../types/dateControl";

export const usePeriodStore = create<DateControlInterface>()(
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
