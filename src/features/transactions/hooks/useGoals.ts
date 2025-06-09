import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthContext";
import type { Goal } from "../types/goalsInterface";
import { getLocalGoals } from "../services/goalService";
import API from "../services/api/axios";

export const useGoals = () => {
  const { token } = useAuth();

  return useQuery<Goal[]>({
    queryKey: ["goals"],
    queryFn: async () => {
      const local = await getLocalGoals();

      if (!token) return local;

      try {
        const res = await API.get("/api/goals");
        console.log("GOALS from server:", res.data);
        return (res.data as any[]).map((g) => ({
          id: g._id,
          title: g.title,
          targetAmount: g.targetAmount,
          currentAmount: g.currentAmount,
          progress: g.progress,
        }));
      } catch (error) {
        console.warn("Error loading goals from server. Using Dexie:", error);
        return local;
      }
    },
    refetchOnReconnect: !!token,
    refetchInterval: token ? 10000 : false,
    initialData: [],
  });
};
