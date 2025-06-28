import React from "react";
import Sidebar from "../features/transactions/components/sidebar";
import TransactionList from "../features/transactions/components/BalanceList";
import MoneyFlow from "../features/transactions/components/GraphsComponents/MoneyFlow";
import { AuthField } from "../features/transactions/components/AuthField";
import BudgetGraph from "../features/transactions/components/GraphsComponents/BudgetGraph";
import RecentTransactionGraph from "../features/transactions/components/GraphsComponents/RecentTransactionGraph";
import GoalsGraphs from "../features/transactions/components/GraphsComponents/GoalsGraphs";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-bgBase flex flex-col sm:flex-row relative transition">
      {/* Sidebar */}
      <AuthField />
      <Sidebar />

      {/* Main Content with AuthField */}
      <div className="py-6 px-4 sm:px-0 w-full  mx-auto md:mx-40">
        <div className="flex justify-center sm:justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-6 text-primary">
            Головна сторінка
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

export default Dashboard;
