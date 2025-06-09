import { db } from "../../../db/db";
import type { Goal } from "../types/goalsInterface";

// ✅ 1. Получение целей из локальной базы (IndexedDB)
export const getLocalGoals = async (): Promise<Goal[]> => {
  const all = await db.goals.toArray();
  console.log("Reading GOALS from Dexie LOCAL: ", all);
  return all;
};

// ✅ 2. Добавление цели в локальную базу
export const addLocalGoal = async (goal: Goal) => {
  console.log("Added GOAL to Dexie LOCAL: ", goal);
  return await db.goals.add({ ...goal, isSynced: 0 });
};

// ✅ 3. Обновление локальной цели
export const updateLocalGoal = async (id: string, updated: Partial<Goal>) => {
  console.log("Updated GOAL in Dexie LOCAL: ", id, updated);
  return await db.goals.update(id, updated);
};

// ✅ 4. Удаление из локальной базы
export const deleteLocalGoal = async (id: string) => {
  console.log("Deleted GOAL from Dexie LOCAL: ", id);
  return await db.goals.delete(id);
};
