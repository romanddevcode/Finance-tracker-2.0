import { useQuery } from "@tanstack/react-query";
import { getLocalTransactions } from "../../../../services/localTransactionsService";
import { useAuth } from "../../../../auth/AuthContext";
import API from "../../../../services/api/axios";
import { useEffect } from "react";
import { useNotificationStore } from "@/services/store/notificationStore";

export const useTransactions = () => {
  const { token } = useAuth();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const query = useQuery({
    queryKey: token ? ["transactions", "server"] : ["transactions", "local"],
    queryFn: async () => {
      if (token && navigator.onLine) {
        const { data } = await API.get("/api/transactions");
        if (!data) throw new Error("No transactions had been found");
        return data;
      } else {
        return await getLocalTransactions();
      }
    },
    enabled: token !== undefined,
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
