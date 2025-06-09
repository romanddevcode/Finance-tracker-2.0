import { db } from "../../../db/db";

export const getBudgetLimitLocal = async (): Promise<number | null> => {
  const setting = await db.settings.get("budgetLimit");
  console.log("Budget limit: ", setting);
  return setting?.limit ?? null;
};

export const setBudgetLimitLocal = async (limit: number) => {
  console.log("Budget limit changed to: ", limit);
  await db.settings.put({ id: "budgetLimit", limit });
};

export const getLimitStateLocal = async (): Promise<boolean> => {
  const setting = await db.settings.get("budgetLimit");
  console.log("Limit state: ", setting);
  return setting?.isLimitActive ?? false;
};

export const setLimitStateLocal = async (isActive: boolean) => {
  const existing = await db.settings.get({ id: "budgetLimit" });
  console.log("Limit state changed to: ", isActive);
  await db.settings.put({
    id: "budgetLimit",
    limit: existing?.limit ?? 0,
    isLimitActive: isActive,
  });
};
