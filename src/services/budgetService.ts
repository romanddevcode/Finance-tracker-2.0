import { db } from "../db/db";
import type { SettingsLimit } from "../types/settingsLimit";

export const getBudgetLimitLocal = async (): Promise<SettingsLimit | null> => {
  const settingsId = await db.settingsLimit.get("budgetLimit");
  if (!settingsId) {
    const defaultSettings: SettingsLimit = {
      id: "budgetLimit",
      value: 0,
      isActivated: false,
      currency: "EUR",
    };
    await db.settingsLimit.put(defaultSettings);
    return defaultSettings;
  }
  return settingsId ?? null;
};

export const setBudgetLimitLocal = async (
  value: number,
  isActive: boolean,
  currency: string
): Promise<void> => {
  const settings: SettingsLimit = {
    id: "budgetLimit",
    value,
    isActivated: isActive,
    currency,
  };
  await db.settingsLimit.put(settings);
};
