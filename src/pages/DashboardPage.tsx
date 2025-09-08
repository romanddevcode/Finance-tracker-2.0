import React from "react";
import Sidebar from "../components/General/Sidebar";
import TransactionList from "../components/General/BalanceList";
import MoneyFlow from "../components/Graphs/MoneyFlow";
import { AuthField } from "../components/General/AuthField";
import BudgetGraph from "../components/Graphs/BudgetGraph";
import RecentTransactionGraph from "../components/Graphs/RecentTransactionGraph";
import { useTranslation } from "react-i18next";

const DashboardPage: React.FC = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="min-h-screen bg-bgBase flex flex-col sm:flex-row relative transition">
      {/* Sidebar */}
      <AuthField />
      <Sidebar />

      {/* Main Content with AuthField */}
      <div className="py-6 px-4 sm:px-0 w-full  mx-auto md:mx-40">
        <div className="flex justify-center sm:justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-6 text-primary">
            {t("main_title")}
          </h1>
        </div>
        <TransactionList />

        <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols- gap-6 mb-6">
          <MoneyFlow />
          <BudgetGraph />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <RecentTransactionGraph />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
