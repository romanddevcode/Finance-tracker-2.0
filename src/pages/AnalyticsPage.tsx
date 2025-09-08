import React from "react";
import { useTransactions } from "../hooks/useTransactions";
import Sidebar from "../components/General/Sidebar";
import { useAnalyticsData } from "../hooks/useAnalyticsData";
import IncomeGraph from "../components/Anlaytics/IncomeGraph";
import ExpenseGraph from "../components/Anlaytics/ExpenseGraph";
import { useTranslation } from "react-i18next";
import { usePeriodStore } from "../store/periodStore";

const AnalyticsPage: React.FC = () => {
  const { data: transactions = [] } = useTransactions();
  const { period, setPeriod } = usePeriodStore();

  const { t } = useTranslation("analytics");

  const {
    incomeByDate_StackedData_RAW,
    expenseByDateAndCategory_StackedData_RAW,
    allCategories,
  } = useAnalyticsData(transactions, period);

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
            onChange={(e) => setPeriod(e.target.value)}
            className="border p-2 rounded bg-secondary text-textBase"
          >
            <option value="week">{t("week")}</option>
            <option value="month">{t("month")}</option>
            <option value="year">{t("year")}</option>
          </select>
        </div>
        <div className="px-4 sm:px-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeGraph
            name={`${t("income_by_date")} (${t(period)})`}
            data={incomeByDate_StackedData_RAW}
          />
          <ExpenseGraph
            name={`${t("expenses_by_date_and_category")} (${t(period)})`}
            data={expenseByDateAndCategory_StackedData_RAW}
            categories={allCategories}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
