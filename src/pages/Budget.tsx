import React from "react";
import Sidebar from "../features/transactions/components/sidebar";
import { useTransactions } from "../features/transactions/hooks/useTransactions";
import { getTransactionsStats } from "../features/transactions/utils/calculateBalance";
import { useBudgetLimit } from "../features/transactions/hooks/useBudgetLimit";

const Budget: React.FC = () => {
  const { data: transactions = [], isLoading } = useTransactions(); // наши транзакции из локальной або серверной бази данних
  const { balance, totalExpense } = getTransactionsStats(transactions); // наши витрати
  const {
    limit,
    isLimitActive,
    overLimit,
    handleLimitChange,
    toggleLimitState,
  } = useBudgetLimit(totalExpense);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Total balance</h3>
            <p className="text-2xl font-bold">{balance.toFixed(2)} грн</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-medium mb-2">Ліміт витрат</h3>
          <div className="flex items-center gap-4">
            <input
              type="number"
              className="border p-2 rounded w-40"
              placeholder="Введіть ліміт"
              value={limit ?? ""}
              onChange={handleLimitChange}
              disabled={!isLimitActive}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isLimitActive}
                onChange={toggleLimitState}
              />
              Активувати ліміт
            </label>
          </div>
          {overLimit && (
            <p className="text-red-500 mt-2 font-semibold">
              Увага: ви перевищили встановлений ліміт витрат!
            </p>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Всього витрат:</h3>
          <p className="text-xl font-bold text-red-500">
            {totalExpense.toFixed(2)} грн
          </p>
        </div>
      </div>
    </div>
  );
};

export default Budget;
