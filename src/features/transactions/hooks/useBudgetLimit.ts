import { useQuery } from "@tanstack/react-query";
import { getBudgetLimitLocal } from "../services/budgetService";
import { useAuth } from "../auth/AuthContext";
import API from "../services/api/axios";
import type { SettingsLimit } from "../types/budgetLimit";

export const useBudgetLimit = () => {
  const { token } = useAuth();

  const queryKeyHandler =
    token && navigator.onLine
      ? ["budgetLimit", "server"]
      : ["budgetLimit", "local"];

  return useQuery({
    queryKey: queryKeyHandler,
    queryFn: async () => {
      if (token && navigator.onLine) {
        const { data: res } = await API.get("/api/budgetsettings");
        if (!res || res.length === 0) {
          return null;
        }
        const { id, value, currency, isActivated } = res;
        return { id, value, currency, isActivated } as SettingsLimit;
      } else {
        return await getBudgetLimitLocal();
      }
    },
    enabled: token !== undefined,
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
