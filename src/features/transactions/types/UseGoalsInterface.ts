import type { Goal } from "./goalsInterface";

export interface UseGoalsResult {
  goals: Goal[];
  loading: boolean;
  addGoal: (goal: Goal) => Promise<void>;
  updateGoal: (id: string, updated: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  addProgress: (goalId: number, value: number) => Promise<void>;
}
