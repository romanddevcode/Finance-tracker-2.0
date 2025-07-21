import React, { useState } from "react";
import { useTransactions } from "../features/transactions/hooks/useTransactions";
import Sidebar from "../features/transactions/components/sidebar";
import { useAnalyticsData } from "../features/transactions/hooks/useAnalyticsData";
import IncomeGraph from "../features/transactions/components/AnlyticsComp/IncomeGraph";
import ExpenseGraph from "../features/transactions/components/AnlyticsComp/ExpenseGraph";
import { useTranslation } from "react-i18next";

const Analytics: React.FC = () => {
  const { data: transactions = [] } = useTransactions();
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");

  const { t } = useTranslation("analytics");

  const { incomeByDateData, expenseByDateStackedData, allCategories } =
    useAnalyticsData(transactions, period);

  return (
    <div className="min-h-screen bg-bgBase flex flex-col  sm:flex-row transition">
      <Sidebar />
      <div className="py-6 pl-0 sm:pl-4 w-full  mx-auto sm:mx-40">
        <div className="flex justify-around sm:justify-between mb-4">
          <h1 className="text-2xl font-bold mb-6 text-primary">
            {t("main_title")}
          </h1>
          <select
            value={period}
            onChange={(e) =>
              setPeriod(e.target.value as "week" | "month" | "year")
            }
            className="border p-2 rounded bg-secondary text-textBase"
          >
            <option value="week">{t("week")}</option>
            <option value="month">{t("month")}</option>
            <option value="year">{t("year")}</option>
          </select>
        </div>
        <div className="px-4 sm:px-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeGraph name={t("income_by_date")} data={incomeByDateData} />
          <ExpenseGraph
            name={t("expenses_by_date_and_category")}
            data={expenseByDateStackedData}
            categories={allCategories}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
