import React from "react";
import Sidebar from "../components/General/Sidebar";
import BalanceList from "../components/General/BalanceList";
import MoneyFlow from "../components/Graphs/MoneyFlow";
import { AuthField } from "../components/General/AuthField";
import BudgetGraph from "../components/Graphs/BudgetGraph";
import RecentTransactionGraph from "../components/Graphs/RecentTransactionGraph";
import { useTranslation } from "react-i18next";
import ExpensePanel from "../components/General/ExpensePanel";
import IncomePanel from "../components/General/IncomePanel";
import BalancePanel from "../components/General/BalancePanel";
import TransactionsList from "../components/features/Transactions/TransactionsList";
import BudgetLimitMain from "../components/features/Budget/BudgetLimitMain";

const DashboardPage: React.FC = () => {
  const { t } = useTranslation("dashboard");

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center lg:text-left text-primary">
        {t("main_title")}
      </h1>

      <div className="grid grid-cols-3 gap-1 mb-3">
        <BalancePanel />
        <IncomePanel />
        <ExpensePanel />
      </div>

      <div className="grid grid-cols-1 gap-3 mb-3">
        <MoneyFlow />
        <BudgetLimitMain />
        <TransactionsList />
      </div>
    </>
  );
};

export default DashboardPage;
