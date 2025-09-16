import { useTranslation } from "react-i18next";
import type { Transaction } from "./types/transactionInterface";
import React from "react";

interface TransactionCardProps {
  tx: Transaction;
  index: number;
  tTransactions: any;
  handleDelete: (id: string) => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = React.memo(
  ({ tx, index, tTransactions, handleDelete }) => {
    const { t: tAnalytics } = useTranslation("analytics");

    return (
      <div key={`${tx.id}-${index}`}>
        <div className="sm:hidden flex flex-col gap-1 p-3 border rounded-md shadow-sm text-base">
          <div className="flex justify-between items-center">
            <span>{tTransactions("type_in_list")}:</span>
            <span
              className={`font-semibold ${
                tx.type === "income" ? "text-income" : "text-expense"
              }`}
            >
              {tx.type === "income"
                ? tTransactions("transaction_type_income")
                : tTransactions("transaction_type_expense")}
            </span>
          </div>

          <div className="flex justify-between">
            <span>{tTransactions("summ_in_list")}:</span>
            <span
              className={`${
                tx.type === "income" ? "text-income" : "text-expense"
              }`}
            >
              {tx.type === "income" ? "+" : "-"} {tx.amount.toFixed(2)}{" "}
              {tx.currency}
            </span>
          </div>

          <div className="flex justify-between">
            <span>{tTransactions("category_in_list")}:</span>
            <span>{tAnalytics(`categories.${tx.category}`)}</span>
          </div>

          <div className="flex justify-between">
            <span>{tTransactions("date_in_list")}:</span>
            <span>{tx.date}</span>
          </div>

          <div>
            <span className="block text-sm ">
              {tTransactions("description_in_list")}
            </span>
            <p className="break-words mb-2">{tx.description || "-"}</p>
            <button
              onClick={() => handleDelete(tx.id!)}
              className="text-white bg-red-500 rounded-md px-2 py-1 hover:text-red-700 transition"
            >
              {tTransactions("action_delete")}
            </button>
          </div>
        </div>

        {/* Десктопная версия */}
        <div className="hidden sm:grid grid-cols-6 gap-x-4 p-3 border rounded-md shadow-sm text-base items-center">
          <span
            className={`font-semibold ${
              tx.type === "income" ? "text-income" : "text-expense"
            }`}
          >
            {tx.type === "income"
              ? tTransactions("transaction_type_income")
              : tTransactions("transaction_type_expense")}
          </span>

          <span
            className={`${
              tx.type === "income" ? "text-income" : "text-expense"
            }`}
          >
            {tx.type === "income" ? "+" : "-"} {tx.amount.toFixed(2)}{" "}
            {tx.currency}
          </span>

          <span>{tAnalytics(`categories.${tx.category}`)}</span>
          <span>{tx.date}</span>
          <span className="break-words">{tx.description || "-"}</span>

          <button
            onClick={() => handleDelete(tx.id!)}
            className="text-white bg-red-500 rounded-md px-2 py-1 hover:text-red-700 transition"
          >
            {tTransactions("action_delete")}
          </button>
        </div>
      </div>
    );
  }
);

export default TransactionCard;
