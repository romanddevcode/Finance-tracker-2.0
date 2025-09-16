export type Period = "week" | "month" | "year" | string;
export interface DateControlInterface {
  period: Period;
  setPeriod: (period: Period) => void;
}
