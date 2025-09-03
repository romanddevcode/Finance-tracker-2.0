import { db } from "../../../db/db";
import type { SettingsLimit } from "../types/budgetLimit";

export const getBudgetLimitLocal = async (): Promise<SettingsLimit> => {
  const settings = await db.settingsLimit.get("budgetLimit");
  if (!settings) throw new Error("No budget limit found");
  return settings;
};

export const setBudgetLimitLocal = async (
  value: number,
  isActive: boolean,
  currency: string
): Promise<void> => {
  await db.settingsLimit.put({
    id: "budgetLimit",
    value,
    isActivated: isActive,
    currency,
  });
};
