import Dexie, { type Table } from "dexie";
import type { Transaction } from "../types/transactionInterface";
import type { SettingsLimit } from "../types/settingsLimit";
import type { Goal } from "../types/goalsInterface";

class FinanceDB extends Dexie {
  transactions!: Table<Transaction>;
  settingsLimit!: Table<SettingsLimit>;
  goals!: Table<Goal>;

  constructor() {
    super("FinanceDB");
    this.version(1).stores({
      transactions:
        "++id, type, amount, currency, date, description, category, isSynced",
      settingsLimit: "&id, value, currency, isActivated",
      goals: "&id, title, targetAmount, currentAmount, currency",
    });
  }
}

export const db = new FinanceDB();
