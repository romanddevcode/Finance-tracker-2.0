import { db } from "../db/db";
import type { Transaction } from "../types/transactionInterface";

export const getLocalTransactions = async (): Promise<Transaction[]> => {
  const all = await db.transactions.toArray();
  return all;
};

export const addLocalTransaction = async (
  tx: Transaction
): Promise<Transaction> => {
  const id = await db.transactions.add({ ...tx });
  const newTransaction = await db.transactions.get(id);

  if (!newTransaction) throw new Error("Transaction not found");

  return newTransaction;
};

export const deleteLocalTransaction = async (id: string): Promise<string> => {
  await db.transactions.delete(id);
  return id;
};
