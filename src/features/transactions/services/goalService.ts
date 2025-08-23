import { db } from "../../../db/db";
import type { Goal } from "../types/goalsInterface";

export const getLocalGoals = async (): Promise<Goal[]> => {
  const all = await db.goals.toArray();

  return all;
};

export const addLocalGoal = async (goal: Goal): Promise<Goal> => {
  const id = await db.goals.add({ ...goal });

  const newGoal = await db.goals.get(id);

  if (!newGoal) throw new Error("Goal not found");

  return newGoal;
};

export const updateLocalGoal = async (
  id: string,
  updated: Partial<Goal>
): Promise<Goal> => {
  await db.goals.update(id, updated);
  const goal = await db.goals.get(id);

  if (!goal) throw new Error("Goal not found");

  return goal;
};

export const deleteLocalGoal = async (id: string): Promise<string> => {
  await db.goals.delete(id);

  return id;
};
