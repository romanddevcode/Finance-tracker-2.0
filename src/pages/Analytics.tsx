import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
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
      <div className="flex-1 p-6">
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
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Доходи по датам</h2>
            <Bar data={incomeByDateChart} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Витрати по датам та категоріям
            </h2>
            <Bar
              data={expenseByDateStacked}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "bottom" },
                },
                scales: {
                  x: { stacked: true },
                  y: { stacked: true },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
