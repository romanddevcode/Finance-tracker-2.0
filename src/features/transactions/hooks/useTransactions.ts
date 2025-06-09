// src/features/transactions/hooks/useTransactions.ts
import { useQuery } from "@tanstack/react-query";
import { getLocalTransactions } from "../services/localTransactionsService";
import { useAuth } from "../auth/AuthContext";
import API from "../services/api/axios";

export const useTransactions = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const local = await getLocalTransactions();

      if (token) {
        try {
          const res = await API.get("/api/transactions");
          console.log("Data got from server: ", res.data);
          return res.data;
        } catch (error) {
          console.warn("Error getting data from server: ", error);
        }
      } else {
        console.log("No token, using local data(Dexie)");
        return local;
      }
      // аноним или офлайн
    },
    refetchOnReconnect: !!token,
    refetchInterval: token ? 5000 : false,
    enabled: token !== undefined,
  });
};
