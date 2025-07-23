import React, { useState } from "react";
import IncomeGraph from "../AnlyticsComp/IncomeGraph";
import { useAnalyticsData } from "../../hooks/useAnalyticsData";
import { useTransactions } from "../../hooks/useTransactions";
import { useTranslation } from "react-i18next";

export const MoneyFlow: React.FC = () => {
  const { data: transactions = [] } = useTransactions();
  const [period] = useState<"week" | "month" | "year">("week");

  const { t } = useTranslation("dashboard");

  const { incomeByDateData } = useAnalyticsData(transactions, period);
  return (
    <div className="bg-secondary p-4 rounded-lg shadow">
      <IncomeGraph
        name={`${t("income_by_date")} ${
          period === t("week") ? t("week") : t("month")
        }`}
        data={incomeByDateData}
      />
    </div>
  );
};

export default MoneyFlow;
