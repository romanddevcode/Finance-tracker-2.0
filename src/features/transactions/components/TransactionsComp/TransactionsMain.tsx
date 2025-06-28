import { useState } from "react";
import { useAddTransaction } from "../../hooks/useTransactionsMutation";
import type { Transaction } from "../../types/transactionInterface";

export const TransactionsMain: React.FC = () => {
  const addTransactionMutation = useAddTransaction();

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
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left text-primary">
        Транзакції
      </h1>

      {/* Форма */}
      <div className="bg-secondary text-textBase p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Додати нову транзакцію</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium  mb-1">Сума:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount || ""}
              onChange={handleChange}
              className="w-full  rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
              placeholder="Введіть суму"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">Тип:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full  rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
            >
              <option value="expense" className="bg-secondary">
                Витрата
              </option>
              <option value="income" className="bg-secondary">
                Дохід
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">
              Категорія:
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
            >
              <option value="Продукти" className="bg-secondary">
                Продукти
              </option>
              <option value="Транспорт" className="bg-secondary">
                Транспорт
              </option>
              <option value="Розваги" className="bg-secondary">
                Розваги
              </option>
              <option value="Інше" className="bg-secondary">
                Інше
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">Дата:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium  mb-1">Опис:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
              placeholder="Додайте опис (опціонально)"
              rows={3}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-primary text-white py-2 px-4 rounded hover:bg-purple-700 transition"
        >
          Додати транзакцію
        </button>
      </div>
    </div>
  );
};

export default TransactionsMain;
