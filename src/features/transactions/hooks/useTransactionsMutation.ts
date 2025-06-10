import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../services/api/axios";
import {
  addLocalTransaction,
  deleteLocalTransaction,
} from "../services/localTransactionsService";
import type { Transaction } from "./../types/transactionInterface";
import { useAuth } from "../auth/AuthContext";

export const useAddTransaction = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transaction: Transaction) => {
      if (token && navigator.onLine) {
        console.log("Added transaction to server: ", transaction);
        return await API.post("/api/transactions", transaction);
      } else {
        console.log("Added to Dexie LOCAL: ", transaction);
        return await addLocalTransaction(transaction);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: token
          ? ["transactions", "server"]
          : ["transactions", "local"],
      });
    },
  });
};

export const useDeleteTransaction = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (token && navigator.onLine) {
        console.log("Deleted transaction from server: ", id);
        return await API.delete(`/api/transactions/${id}`);
      } else {
        console.log("Deleted from Dexie LOCAL: ", id);
        return await deleteLocalTransaction(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: token
          ? ["transactions", "server"]
          : ["transactions", "local"],
      });
    },
  });
};
