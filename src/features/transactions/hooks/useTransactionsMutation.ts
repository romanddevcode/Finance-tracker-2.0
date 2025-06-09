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
      if (token) {
        return await API.post("/api/transactions", transaction);
      } else {
        return await addLocalTransaction(transaction);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

export const useDeleteTransaction = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (token) {
        return await API.delete(`/api/transactions/${id}`);
      } else {
        return await deleteLocalTransaction(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
