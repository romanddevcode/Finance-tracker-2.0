import React, { useState } from "react";
import IncomeGraph from "../AnlyticsComp/IncomeGraph";
import { useAnalyticsData } from "../../hooks/useAnalyticsData";
import { useTransactions } from "../../hooks/useTransactions";
import { useTranslation } from "react-i18next";
import { periodStore } from "../../../../store/periodStore";

export const MoneyFlow: React.FC = () => {
  const { data: transactions = [] } = useTransactions();
  const { period } = periodStore();

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
