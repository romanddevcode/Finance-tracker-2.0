import { type Transaction } from "../types/transactionInterface";

export const getTransactionsStats = (transactions: Transaction[]) => {
  const totalIncome = transactions
    .filter((tx: Transaction) => tx.type === "income")
    .reduce((acc: number, tx: Transaction) => acc + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx: Transaction) => tx.type === "expense")
    .reduce((acc: number, tx: Transaction) => acc + tx.amount, 0);

  const balance = totalIncome - totalExpense;
  return { totalIncome, totalExpense, balance };
};
