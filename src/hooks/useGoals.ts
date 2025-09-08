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
        const { data } = await API.get<Goal[]>("/api/goals");
        return data;
      } else {
        return await getLocalGoals();
      }
    },
    enabled: token !== undefined,
    staleTime: 1000 * 60 * 60, // 1 час
    refetchInterval: 1000 * 60 * 5, // 5 минут
    refetchOnWindowFocus: false,
  });
};
