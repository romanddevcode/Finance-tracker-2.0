export interface RechartsExpenseEntry {
  name: string;
  [category: string]: number | string;
  expense: number;
}

export type AccamulatedData = {
  incomeByDate: Record<string, number>;
  expenseByDateAndCategory: Record<string, Record<string, number>>;
  allCategories: Set<string>;
  allDates: Set<string>;
};

export interface ExpenseGraphProps {
  data: Record<string, Record<string, number>>;
  name: string;
  categories: Array<string>;
}

export interface IncomeGraphProps {
  data: Record<string, number>;
  name: string;
}
