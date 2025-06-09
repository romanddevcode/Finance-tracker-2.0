import { useMemo } from "react";
import type { Transaction } from "../../transactions/types/transactionInterface";
import type { ChartData, ChartDataset } from "chart.js";

type Period = "week" | "month" | "year";

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

    const incomeByDateChart: ChartData<"bar", number[], string> = {
      labels: Object.keys(incomeByDate),
      datasets: [
        {
          label: "Доходи",
          data: Object.values(incomeByDate),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };

    const expenseByDateStacked: ChartData<"bar", number[], string> = {
      labels: allDates,
      datasets: allCategories.map(
        (category, i): ChartDataset<"bar", number[]> => ({
          label: category,
          data: allDates.map((date) => {
            const dateEntry = expenseByDateAndCategory[date] || {};
            return dateEntry[category] ?? 0;
          }),
          backgroundColor: `hsl(${(i * 50) % 360}, 70%, 60%)`,
        })
      ),
    };

    return {
      incomeByDateChart,
      expenseByDateStacked,
      allDates,
      allCategories,
    };
  }, [transactions, period]);

  return result;
};
