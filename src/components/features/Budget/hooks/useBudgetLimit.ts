import { useQuery } from "@tanstack/react-query";
import { getBudgetLimitLocal } from "../../../../services/budgetService";
import { useAuth } from "../../../../auth/AuthContext";
import API from "../../../../services/api/axios";
import type { SettingsLimit } from "../types/settingsLimit";
import { useNotificationStore } from "@/services/store/notificationStore";
import { useEffect } from "react";

export const useBudgetLimit = () => {
  const { token } = useAuth();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const queryKeyHandler =
    token && navigator.onLine
      ? ["budgetLimit", "server"]
      : ["budgetLimit", "local"];

  const query = useQuery<SettingsLimit | null, Error>({
    queryKey: queryKeyHandler,
    queryFn: async () => {
      if (token && navigator.onLine) {
        const { data: res } = await API.get("/api/budgetsettings");

        if (!res || res.length === 0) {
          return null;
        }

        if (res.error) {
          throw new Error(res.error as string); // важно: кидаем ошибку
        }

        const { id, value, currency, isActivated } = res;
        return { id, value, currency, isActivated } as SettingsLimit;
      } else {
        return await getBudgetLimitLocal();
      }
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isError && query.error) {
      addNotification("error", query.error.message);
    }
  }, [query.isError, query.error]);

  return query;
};
