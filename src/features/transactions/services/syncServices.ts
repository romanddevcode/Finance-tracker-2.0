import { db } from "../../../db/db";
import API from "../services/api/axios";

export const syncTransactions = async () => {
  const unsynced = await db.transactions.where("isSynced").equals(0).toArray();

  for (const tx of unsynced) {
    try {
      const res = await API.post("/api/transactions", tx);
      if (res.status === 201 || res.status === 200) {
        // удаляем после успешной отправки
        await db.transactions.delete(tx.id!);
      }
    } catch (err) {
      console.error(" Sync error", err);
    }
  }
};
//Временно отключен на доработку
