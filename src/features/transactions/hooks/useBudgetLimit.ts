import { useQuery } from "@tanstack/react-query";
import { getBudgetLimitLocal } from "../services/budgetService";
import { useAuth } from "../auth/AuthContext";
import API from "../services/api/axios";

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
        const res = await API.get("/api/budgetsettings");
        console.log("Budget settings from server:", res.data);
        return res.data;
      } else {
        console.log("No token, using local limit(Dexie)");
        return await getBudgetLimitLocal();
      }
    },
    enabled: token !== undefined,
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
