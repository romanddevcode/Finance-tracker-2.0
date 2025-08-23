import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthContext";
import type { Goal } from "../types/goalsInterface";
import { getLocalGoals } from "../services/goalService";
import API from "../services/api/axios";

export const useGoals = () => {
  const { token } = useAuth();

  return useQuery<Goal[]>({
    queryKey: token ? ["goals", "server"] : ["goals", "local"],
    queryFn: async () => {
      if (token && navigator.onLine) {
        const { data: res } = await API.get("/api/goals");
        if (!res) throw new Error("No goals found");
        const convertedDate = res.map((g: Goal) => ({
          currency: g.currency,
          currentAmount: g.currentAmount,
          id: g.id,
          title: g.title,
          targetAmount: g.targetAmount,
        }));

        return convertedDate;
      } else {
        return await getLocalGoals();
      }
    },

    enabled: token !== undefined,
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
