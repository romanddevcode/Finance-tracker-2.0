import { useMemo } from "react";
import type { Transaction } from "../types/transactionInterface";

type Period = "week" | "month" | "year";

interface RechartsIncomeEntry {
  name: string;
  income: number;
}

interface RechartsExpenseEntry {
  name: string;
  [category: string]: number | string;
}

export const useAnalyticsData = (
  transactions: Transaction[],
  period: Period
) => {
  const now = new Date();

  const filterByPeriod = (tx: Transaction) => {
    const txDate = new Date(tx.date);
    if (period === "week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      return txDate >= startOfWeek && txDate < endOfWeek;
    } else if (period === "month") {
      return (
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      );
    } else if (period === "year") {
      return txDate.getFullYear() === now.getFullYear();
    }
    return true;
  };

  const result = useMemo(() => {
    const filtered = transactions.filter(filterByPeriod);
    const incomeData = filtered.filter((tx) => tx.type === "income");
    const expenseData = filtered.filter((tx) => tx.type === "expense");

    const incomeByDate = incomeData.reduce<Record<string, number>>(
      (acc, tx) => {
        const date = tx.date;
        acc[date] = (acc[date] || 0) + tx.amount;
        return acc;
      },
      {}
    );

    const expenseByDateAndCategory = expenseData.reduce<
      Record<string, Record<string, number>>
    >((acc, tx) => {
      const date = tx.date;
      const category = tx.category || "Інше";
      if (!acc[date]) acc[date] = {};
      acc[date][category] = (acc[date][category] || 0) + tx.amount;
      return acc;
    }, {});

    const allCategories: string[] = Array.from(
      new Set(expenseData.map((tx) => tx.category || "Інше"))
    );

    const allDates = Array.from(
      new Set(Object.keys(expenseByDateAndCategory))
    ).sort();

    const incomeByDateData: RechartsIncomeEntry[] = Object.entries(
      incomeByDate
    ).map(([date, amount]) => ({
      name: date,
      income: amount,
    }));

    const expenseByDateStackedData: RechartsExpenseEntry[] = allDates.map(
      (date) => {
        const entry: RechartsExpenseEntry = { name: date };
        allCategories.forEach((category) => {
          entry[category] = expenseByDateAndCategory[date]?.[category] || 0;
        });
        return entry;
      }
    );

    return {
      incomeByDateData,
      expenseByDateStackedData,
      allDates,
      allCategories,
    };
  }, [transactions, period]);

  return result;
};
