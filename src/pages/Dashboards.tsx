// Обновлённый компонент Dashboard с учётом последних изменений (React Query, типизация и расчёты)

import React from "react";
import Sidebar from "../features/transactions/components/sidebar";
import TransactionList from "../features/transactions/components/BalanceList";
import { AuthField } from "../features/transactions/components/AuthField";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <button className="text-blue-500 mr-4">&lt;</button>
            <span className="text-xl font-semibold">Welcome back, user!</span>
          </div>
          <AuthField />
        </div>

        <TransactionList />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Money flow</h3>
            <p className="text-gray-500">graphs</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Budget</h3>
            <p className="text-gray-500">graphs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Recent transactions</h3>
            <p className="text-gray-500">graphs</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Goals</h3>
            <p className="text-gray-500">graphs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
