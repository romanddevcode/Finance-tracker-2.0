import { useState } from "react";
import { useAddTransaction } from "../../hooks/useTransactionsMutation";
import type { Transaction } from "../../types/transactionInterface";
import { useTranslation } from "react-i18next";

export const TransactionsMain: React.FC = () => {
  const addTransactionMutation = useAddTransaction();

  const { t } = useTranslation("transactions");

  const [formData, setFormData] = useState<Transaction>({
    id: "",
    amount: 0,
    currency: "EUR",
    type: "expense",
    category: "Products",
    date: new Date().toISOString().slice(0, 10),
    description: "",
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.amount <= 0) return;

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
      currency: "EUR",
      type: formData.type,
      category: formData.category,
      date: new Date().toISOString().slice(0, 10),
      description: "",
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
        {t("main_title")}
      </h1>

      {/* Форма */}
      <div className="bg-secondary text-textBase p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {t("new_transaction_add")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium  mb-1">
              {t("summ")}
              <input
                type="number"
                name="amount"
                value={formData.amount || ""}
                onChange={handleChange}
                className="w-full  rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
                placeholder={t("summ_placeholder")}
                required
              />
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              >
                <option value="EUR" className="bg-secondary">
                  EUR
                </option>
                <option value="USD" className="bg-secondary">
                  USD
                </option>
                <option value="UAH" className="bg-secondary">
                  UAH
                </option>
              </select>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">
              {t("type")}
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full  rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
            >
              <option value="expense" className="bg-secondary">
                {t("transaction_type_expense")}
              </option>
              <option value="income" className="bg-secondary">
                {t("transaction_type_income")}
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">
              {t("category")}
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
            >
              <option value="Products" className="bg-secondary">
                {t("category_type_products")}
              </option>
              <option value="Transport" className="bg-secondary">
                {t("category_type_transport")}
              </option>
              <option value="Fun" className="bg-secondary">
                {t("category_type_fun")}
              </option>
              <option value="Other" className="bg-secondary">
                {t("category_type_other")}
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">
              {t("date")}
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium  mb-1">
              {t("description")}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2 min-h-20 resize-none"
              placeholder={t("description_placeholder")}
              rows={3}
              maxLength={60}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-primary text-white py-2 px-4 rounded hover:bg-purple-700 transition"
        >
          {t("new_transaction_add")}
        </button>
      </div>
    </div>
  );
};

export default TransactionsMain;
