import { useQuery } from "@tanstack/react-query";
import { getLocalTransactions } from "../services/localTransactionsService";
import { useAuth } from "../auth/AuthContext";
import API from "../services/api/axios";

export const useTransactions = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: token ? ["transactions", "server"] : ["transactions", "local"],
    queryFn: async () => {
      if (token && navigator.onLine) {
        const res = await API.get("/api/transactions");
        console.log("TRANSACTIONS from server:", res.data);
        return res.data;
      } else {
        console.log("No token, using local data(Dexie)");
        return await getLocalTransactions();
      }
    },

    enabled: token !== undefined,
  });
};
