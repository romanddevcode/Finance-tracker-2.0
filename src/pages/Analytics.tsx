import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTransactions } from "../features/transactions/hooks/useTransactions";
import Sidebar from "../features/transactions/components/sidebar";
import { useAnalyticsData } from "../features/transactions/hooks/useAnalyticsData";
import IncomeGraph from "../features/transactions/components/AnlyticsComp/IncomeGraph";
import ExpenseGraph from "../features/transactions/components/AnlyticsComp/ExpenseGraph";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Analytics: React.FC = () => {
  const { data: transactions = [] } = useTransactions();
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");

  const { incomeByDateChart, expenseByDateStacked } = useAnalyticsData(
    transactions,
    period
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="py-6 pl-4 w-full max-w-4xl mx-auto sm:mx-40">
        <div className="flex justify-end mb-4">
          <select
            value={period}
            onChange={(e) =>
              setPeriod(e.target.value as "week" | "month" | "year")
            }
            className="border p-2 rounded"
          >
            <option value="week">Тиждень</option>
            <option value="month">Місяць</option>
            <option value="year">Рік</option>
          </select>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <IncomeGraph name="Дохід по датам" data={incomeByDateChart} />
          <ExpenseGraph data={expenseByDateStacked} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
