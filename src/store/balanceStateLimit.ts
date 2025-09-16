import { create } from "zustand";

type balanceStateLimit = {
  isOverLimit: boolean;
  setIsOverLimit: (value: boolean) => void;
};

export const useBalanceStateLimit = create<balanceStateLimit>((set) => ({
  isOverLimit: false,
  setIsOverLimit: (value) => set({ isOverLimit: value }),
}));

export default useBalanceStateLimit;
