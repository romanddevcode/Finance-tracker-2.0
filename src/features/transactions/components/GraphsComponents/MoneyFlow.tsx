import React, { useState } from "react";
import IncomeGraph from "../AnlyticsComp/IncomeGraph";
import { useAnalyticsData } from "../../hooks/useAnalyticsData";
import { useTransactions } from "../../hooks/useTransactions";

export const MoneyFlow: React.FC = () => {
  const { data: transactions = [] } = useTransactions();
  const [period] = useState<"week" | "month" | "year">("week");

  const { incomeByDateData } = useAnalyticsData(transactions, period);
  return (
    <div className="bg-secondary p-4 rounded-lg shadow">
      <IncomeGraph
        name={`Дохід  по датам за ${period === "week" ? "тиждень" : "місяць"}`}
        data={incomeByDateData}
      />
    </div>
  );
};

export default MoneyFlow;
