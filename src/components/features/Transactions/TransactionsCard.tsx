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
      <div
        key={`${tx.id}-${index}`}
        className="grid sm:grid-cols-6 grid-cols-1 gap-y-1 gap-x-4 p-3 border rounded-md shadow-sm text-sm sm:items-center"
      >
        {/* Desktop: просто текст */}
        {/* Mobile: Лейбл + значення */}
        <div>
          <span className="sm:hidden">{tTransactions("type_in_list")}</span>
          <span
            className={`font-semibold ${
              tx.type === "income" ? "text-income" : "text-expense"
            }`}
          >
            {tx.type === "income"
              ? `${tTransactions("transaction_type_income")}`
              : `${tTransactions("transaction_type_expense")}`}
          </span>
        </div>

        <div>
          <span className="sm:hidden">{tTransactions("summ_in_list")}</span>
          <span
            className={`${
              tx.type === "income" ? "text-income" : "text-expense"
            }`}
          >
            {tx.type === "income" ? "+" : "-"} {tx.amount.toFixed(2)}{" "}
            {tx.currency}
          </span>
        </div>

        <div>
          <span className="sm:hidden">{tTransactions("category_in_list")}</span>
          {tAnalytics(`categories.${tx.category}`)}
        </div>

        <div>
          <span className="sm:hidden">{tTransactions("date_in_list")}</span>
          {tx.date}
        </div>

        <div className="break-words">
          <span className="sm:hidden">
            {tTransactions("description_in_list")}
          </span>
          {tx.description || "-"}
        </div>

        <div>
          <span className="sm:hidden">{tTransactions("action_in_list")}</span>
          <button
            onClick={() => handleDelete(tx.id!)}
            className="text-red-500 hover:text-red-700 transition"
          >
            {tTransactions("action_delete")}
          </button>
        </div>
      </div>
    );
  }
);

export default TransactionCard;
