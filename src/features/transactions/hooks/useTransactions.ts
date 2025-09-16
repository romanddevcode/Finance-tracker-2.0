import { useQuery } from "@tanstack/react-query";
import { getLocalTransactions } from "../services/localTransactionsService";
import { useAuth } from "../auth/AuthContext";
import API from "../services/api/axios";
import type { Transaction } from "../types/transactionInterface";

export const useTransactions = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: token ? ["transactions", "server"] : ["transactions", "local"],
    queryFn: async () => {
      if (token && navigator.onLine) {
        const { data: res } = await API.get("/api/transactions");
        if (!res) throw new Error("No transactions had been found");
        const convertedDate = res.map((tx: Transaction) => ({
          id: tx.id,
          amount: tx.amount,
          currency: tx.currency,
          category: tx.category,
          type: tx.type,
          description: tx.description,
          date: tx.date,
        }));

        return convertedDate;
      } else {
        return await getLocalTransactions();
      }
    },

    enabled: token !== undefined,
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
