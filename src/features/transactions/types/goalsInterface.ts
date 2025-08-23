// types/goal.ts
export interface Goal {
  id?: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
}
