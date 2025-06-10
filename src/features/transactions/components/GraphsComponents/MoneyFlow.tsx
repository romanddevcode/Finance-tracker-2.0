import React, { useState } from "react";
import IncomeGraph from "../AnlyticsComp/IncomeGraph";
import { useAnalyticsData } from "../../hooks/useAnalyticsData";
import { useTransactions } from "../../hooks/useTransactions";

export const MoneyFlow: React.FC = () => {
  const { data: transactions = [] } = useTransactions();
  const [period, setPeriod] = useState<"week" | "month" | "year">("week");

  const { incomeByDateChart } = useAnalyticsData(transactions, period);
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <IncomeGraph name="Дохід  по датам" data={incomeByDateChart} />
    </div>
  );
};

export default MoneyFlow;
