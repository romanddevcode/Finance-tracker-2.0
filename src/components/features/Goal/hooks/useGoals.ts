import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../../auth/AuthContext";
import type { Goal } from "../types/goalsInterface";
import { getLocalGoals } from "../../../../services/goalService";
import API from "../../../../services/api/axios";
import { useEffect } from "react";
import { useNotificationStore } from "@/services/store/notificationStore";

export const useGoals = () => {
  const { token } = useAuth();

  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const query = useQuery<Goal[]>({
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

  useEffect(() => {
    if (query.isError && query.error) {
      addNotification("error", query.error.message);
    }
  }, [query.isError, query.error]);

  return query;
};
