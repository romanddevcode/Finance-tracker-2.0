import Dexie, { type Table } from "dexie";
import type { Transaction } from "../features/transactions/types/transactionInterface";
import type { Settings } from "../features/transactions/types/budgetLimit";
import type { Goal } from "../features/transactions/types/goalsInterface";

class FinanceDB extends Dexie {
  transactions!: Table<Transaction>;
  settings!: Table<Settings>;
  goals!: Table<Goal>;

  constructor() {
    super("FinanceDB");
    this.version(1).stores({
      transactions:
        "++id, type, amount, currency, date, description, category, isSynced",
      settings: "&id",
      goals: "&id, title, targetAmount, currentAmount",
    });
  }
}

export const db = new FinanceDB();
