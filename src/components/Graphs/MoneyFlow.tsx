import React from "react";
import IncomeGraph from "../features/Anlaytics/IncomeGraph";
import { useAnalyticsData } from "../features/Anlaytics/hooks/useAnalyticsData";
import { useTransactions } from "../features/Transactions/hooks/useTransactions";
import { useTranslation } from "react-i18next";
import { usePeriodStore } from "../../services/store/periodStore";

export const MoneyFlow: React.FC = () => {
  const { data: transactions = [] } = useTransactions();
  const { period } = usePeriodStore();

  const { t } = useTranslation("dashboard");

  const { incomeByDate_StackedData_RAW } = useAnalyticsData(
    transactions,
    period
  );
  return (
    <div className="bg-secondary p-4 rounded-lg shadow">
      <IncomeGraph
        name={`${t("income_by_date")} (${t(period)})`}
        data={incomeByDate_StackedData_RAW}
      />
    </div>
  );
};

export default MoneyFlow;
