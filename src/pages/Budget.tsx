import React from "react";
import Sidebar from "../features/transactions/components/sidebar";
import { useTransactions } from "../features/transactions/hooks/useTransactions";
import { getTransactionsStats } from "../features/transactions/utils/calculateBalance";
import BudgetLimitMain from "../features/transactions/components/BudgetComponent/BudhetLimitMain";

const Budget: React.FC = () => {
  const { data: transactions = [], isLoading } = useTransactions(); // наши транзакции из локальной або серверной бази данних
  const { balance, totalExpense } = getTransactionsStats(transactions); // наши витрати

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="py-6 pl-4 w-full max-w-4xl mx-auto sm:mx-40">
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-2">Баланс</h3>
              <p className="text-2xl font-bold">{balance.toFixed(2)} грн</p>
            </div>
          </div>

          <BudgetLimitMain />

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Всього витрат:</h3>
            <p className="text-xl font-bold text-red-500">
              {totalExpense.toFixed(2)} грн
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
