import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../services/api/axios";
import {
  addLocalTransaction,
  deleteLocalTransaction,
} from "../services/localTransactionsService";
import type { Transaction } from "../types/transactionInterface";
import { useAuth } from "../auth/AuthContext";

export const useAddTransaction = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const queryKeyHandler =
    token && navigator.onLine
      ? ["transactions", "server"]
      : ["transactions", "local"];

  return useMutation({
    mutationFn: async (transaction: Transaction) => {
      if (token && navigator.onLine) {
        console.log("Added transaction to server: ", transaction);
        const { data } = await API.post<Transaction>(
          "/api/transactions",
          transaction
        );
        return data;
      } else {
        console.log("Added to Dexie LOCAL: ", transaction);
        await addLocalTransaction(transaction).catch((error) =>
          console.error(error)
        );
        return transaction;
      }
    },
    onMutate: async (newTransaction) => {
      await queryClient.cancelQueries({
        queryKey: queryKeyHandler,
      });
      const previousTransactions =
        queryClient.getQueryData<Transaction[]>(queryKeyHandler);

      queryClient.setQueryData<Transaction[]>(queryKeyHandler, (old = []) => [
        ...old,
        newTransaction,
      ]);

      return { previousTransactions };
    },
    onError: (error, _newTransaction, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData<Transaction[]>(
          queryKeyHandler,
          context.previousTransactions
        );
      }
      console.error(error);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: queryKeyHandler }),
  });
};

export const useDeleteTransaction = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const queryKeyHandler =
    token && navigator.onLine
      ? ["transactions", "server"]
      : ["transactions", "local"];

  return useMutation({
    mutationFn: async (id: string) => {
      if (token && navigator.onLine) {
        console.log("Deleted transaction from server: ", id);
        await API.delete(`/api/transactions/${id}`);
      } else {
        console.log("Deleted from Dexie LOCAL: ", id);
        await deleteLocalTransaction(id).catch((error) => console.error(error));
      }
    },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({
        queryKey: queryKeyHandler,
      });
      const previousTransactions =
        queryClient.getQueryData<Transaction[]>(queryKeyHandler);

      queryClient.setQueryData<Transaction[]>(queryKeyHandler, (old = []) =>
        old.filter((g) => g.id !== deletedId)
      );

      return { previousTransactions };
    },
    onError: (error, _deletedId, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(queryKeyHandler, context.previousTransactions);
      }
      console.error(error);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: queryKeyHandler }),
  });
};
