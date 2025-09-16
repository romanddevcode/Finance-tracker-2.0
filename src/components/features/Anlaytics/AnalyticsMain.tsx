import { useTranslation } from "react-i18next";
import { usePeriodStore } from "../../../services/store/periodStore";
import { useTransactions } from "../Transactions/hooks/useTransactions";
import ExpenseGraph from "./ExpenseGraph";
import { useAnalyticsData } from "./hooks/useAnalyticsData";
import IncomeGraph from "./IncomeGraph";

export const AnalyticsMain: React.FC = () => {
  const { data: transactions = [] } = useTransactions();
  const { period, setPeriod } = usePeriodStore();
  const { t } = useTranslation("analytics");

  const {
    incomeByDate_StackedData_RAW,
    expenseByDateAndCategory_StackedData_RAW,
    allCategories,
  } = useAnalyticsData(transactions, period);

  return (
    <div className="text-center md:text-left text-textBase mb-6">
      <div className="flex justify-end mb-4">
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
  );
};

export default AnalyticsMain;
