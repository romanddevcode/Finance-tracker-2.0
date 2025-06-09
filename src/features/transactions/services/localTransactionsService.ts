import { db } from "../../../db/db";
import type { Transaction } from "../types/transactionInterface";

export const getLocalTransactions = async (): Promise<Transaction[]> => {
  const all = await db.transactions.toArray();
  console.log("Reading from Dexie LOCAL: ", all);
  return all;
};

export const addLocalTransaction = async (tx: Transaction) => {
  console.log("Added to Dexie LOCAL: ", tx);
  return await db.transactions.add({ ...tx, isSynced: 0 });
};

export const deleteLocalTransaction = async (id: string) => {
  console.log("Deleted from Dexie LOCAL: ", id);
  return await db.transactions.delete(id);
};
