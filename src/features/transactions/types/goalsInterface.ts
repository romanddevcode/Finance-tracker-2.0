// types/goal.ts
export interface Goal {
  id?: string;
  title: string;
  progress: number;
  targetAmount: number;
  currentAmount: number;
  isSynced?: 1 | 0;
}
