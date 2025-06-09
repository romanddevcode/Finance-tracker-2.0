// Обновлённый Transaction.tsx с вынесенной логикой и импортами из новых модулей
import React, { useState } from "react";
import Sidebar from "../features/transactions/components/sidebar";
import { useTransactions } from "../features/transactions/hooks/useTransactions";
import { getTransactionsStats } from "../features/transactions/utils/calculateBalance";
import type { Transaction } from "../features/transactions/types/transactionInterface";

import {
  useAddTransaction,
  useDeleteTransaction,
} from "../features/transactions/hooks/useTransactionsMutation";

const TransactionsPage: React.FC = () => {
  const { data: transactions = [], isLoading } = useTransactions();
  const addTransactionMutation = useAddTransaction();
  const deleteTransactionMutation = useDeleteTransaction();

  const [formData, setFormData] = useState<Transaction>({
    id: "",
    amount: 0,
    type: "expense",
    category: "Продукти",
    date: new Date().toISOString().slice(0, 10),
    description: "",
    isSynced: 0,
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.amount <= 0) {
      alert("Сума має бути більшою за 0!");
      return;
    }

    const newTransaction: Transaction = {
      ...formData,
      id: Date.now().toString(),
    };

    try {
      await addTransactionMutation.mutateAsync(newTransaction);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }

    setFormData({
      amount: 0,
      type: "expense",
      category: "Продукти",
      date: new Date().toISOString().slice(0, 10),
      description: "",
      isSynced: 0,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteTransactionMutation.mutateAsync(id);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const { balance } = getTransactionsStats(transactions);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="p-6 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-purple-700">Транзакції</h1>

        {/* Форма */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Додати нову транзакцію</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Сума:
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount || ""}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
                placeholder="Введіть суму"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Тип:
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
              >
                <option value="expense">Витрата</option>
                <option value="income">Дохід</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Категорія:
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
              >
                <option value="Продукти">Продукти</option>
                <option value="Транспорт">Транспорт</option>
                <option value="Розваги">Розваги</option>
                <option value="Інше">Інше</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дата:
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Опис:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
                placeholder="Додайте опис (опціонально)"
                rows={3}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            Додати транзакцію
          </button>
        </div>

        {/* Список */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Список транзакцій</h2>
          <p className="text-lg mb-4">
            Поточний баланс: {balance.toFixed(2)} грн
          </p>

          {isLoading ? (
            <p>Завантаження...</p>
          ) : transactions.length === 0 ? (
            <p className="text-gray-500">Транзакції відсутні.</p>
          ) : (
            <div className="max-h-56 overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-sm font-medium text-gray-700">
                      Тип
                    </th>
                    <th className="p-3 text-sm font-medium text-gray-700">
                      Сума
                    </th>
                    <th className="p-3 text-sm font-medium text-gray-700">
                      Категорія
                    </th>
                    <th className="p-3 text-sm font-medium text-gray-700">
                      Дата
                    </th>
                    <th className="p-3 text-sm font-medium text-gray-700">
                      Опис
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx: Transaction, index: number) => (
                    <tr key={`${tx.id}-${index}`} className="border-t">
                      <td
                        className={`p-3 ${
                          tx.type === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {tx.type === "income" ? "Дохід" : "Витрата"}
                      </td>
                      <td
                        className={`p-3 ${
                          tx.type === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {tx.type === "income" ? "+" : "-"}{" "}
                        {tx.amount.toFixed(2)} грн
                      </td>
                      <td className="p-3">{tx.category}</td>
                      <td className="p-3">{tx.date}</td>
                      <td className="p-3">{tx.description || "-"}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDelete(tx.id!)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Видалити
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
