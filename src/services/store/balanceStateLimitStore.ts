import { create } from "zustand";
import { persist } from "zustand/middleware";

type BalanceStateLimit = {
  isOverLimit: boolean;
  setIsOverLimit: (isOverLimit: boolean) => void;
};

export const useBalanceStateLimit = create<BalanceStateLimit>()(
  persist(
    (set) => ({
      isOverLimit: false,
      setIsOverLimit: (value) => set({ isOverLimit: value }),
    }),
    {
      name: "balanceStateLimit",
    }
  )
);

export default useBalanceStateLimit;
