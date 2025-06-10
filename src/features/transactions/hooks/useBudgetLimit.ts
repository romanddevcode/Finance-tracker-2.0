import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBudgetLimitLocal,
  setBudgetLimitLocal,
  getLimitStateLocal,
  setLimitStateLocal,
} from "../services/budgetService";
import { useAuth } from "../auth/AuthContext";
import API from "../services/api/axios";

export const useBudgetLimit = (totalExpense: number) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["budgetLimit"],
    queryFn: async () => {
      const localLimit = await getBudgetLimitLocal();
      const localState = await getLimitStateLocal();

      if (token && navigator.onLine) {
        try {
          const res = await API.get("/api/budgetsettings");
          console.log("Budget settings from server:", res.data);
          return res.data;
        } catch (error) {
          console.warn("Error getting budget settings, using local:", error);
          return {
            limit: localLimit ?? null,
            isLimitActive: localState ?? true,
          };
        }
      }

      return {
        limit: localLimit ?? null,
        isLimitActive: localState ?? true,
      };
    },
    refetchOnReconnect: !!token,
    enabled: token !== undefined,
  });

  const [limit, setLimit] = useState<number | null>(null);
  const [isLimitActive, setIsLimitActive] = useState<boolean>(true);

  useEffect(() => {
    if (data) {
      setLimit(data.limit);
      setIsLimitActive(data.isLimitActive);
    }
  }, [data]);

  const handleLimitChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = Math.max(5, Number(e.target.value));
    setLimit(newLimit);

    // локальное обновление
    await setBudgetLimitLocal(newLimit);

    // можно сюда добавить POST на сервер
    if (token && navigator.onLine) {
      try {
        await API.post("/api/budgetsettings", {
          limit: newLimit,
          isLimitActive,
        });
        queryClient.invalidateQueries({ queryKey: ["budgetLimit"] });
      } catch (err) {
        console.error("Failed to update server limit", err);
      }
    }
  };

  const toggleLimitState = async () => {
    const newState = !isLimitActive;
    setIsLimitActive(newState);

    await setLimitStateLocal(newState);

    if (token && navigator.onLine) {
      try {
        await API.post("/api/budgetsettings", {
          limit,
          isLimitActive: newState,
        });
        queryClient.invalidateQueries({ queryKey: ["budgetLimit"] });
      } catch (err) {
        console.error("Failed to update server limit state", err);
      }
    }
  };

  const overLimit = isLimitActive && limit !== null && totalExpense > limit;

  return {
    limit,
    isLimitActive,
    overLimit,
    handleLimitChange,
    toggleLimitState,
  };
};
