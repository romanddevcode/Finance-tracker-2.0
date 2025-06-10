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
    <div className="sm:pl-24 min-h-screen bg-gray-100 dark:bg-gray-900 flex relative">
      {/* Sidebar */}
      <AuthField />
      <Sidebar />

      {/* Main Content with AuthField */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-xl font-semibold">Welcome back, user!</span>
          </div>
        </div>

        <TransactionList />

        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols- gap-6 mb-6">
          <MoneyFlow />
          <BudgetGraph />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentTransactionGraph />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
