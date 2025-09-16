import { useDeleteTransaction } from "../../hooks/useTransactionsMutation";
import { getTransactionsStats } from "../../utils/calculateBalance";
import { useTransactions } from "../../hooks/useTransactions";
import type { Transaction } from "../../types/transactionInterface";
import { useTranslation } from "react-i18next";
import { useCurrencyStore } from "../../../../store/currencyTypeControl";

export const TransactionsList: React.FC = () => {
  const { data: transactions = [], isLoading } = useTransactions();
  const { balance } = getTransactionsStats(transactions);

  const { selectedCurrency, setCurrency } = useCurrencyStore();

  const { t: tTransactions } = useTranslation("transactions");
  const { t: tAnalytics } = useTranslation("analytics");

  const deleteTransactionMutation = useDeleteTransaction();

  const handleDelete = async (id: string) => {
    await deleteTransactionMutation.mutateAsync(id);
  };

  return (
    <div className="bg-secondary text-textBase p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {tTransactions("list_of_transactions")}
      </h2>
      <p className="text-lg mb-4">
        {tTransactions("current_balance")} {balance.toFixed(2)}{" "}
        {selectedCurrency}
      </p>
      <select
        name="balanceCurrency"
        value={selectedCurrency}
        onChange={(e) => setCurrency(e.target.value)}
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

      {isLoading ? (
        <p>{tTransactions("loading")}</p>
      ) : transactions.length === 0 ? (
        <p className="text-textBase">{tTransactions("no_transactions")}</p>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {/* Table Header для desktop */}
          <div className="hidden sm:grid grid-cols-6 gap-4  p-2 rounded font-medium text-sm text-textBase">
            <span>{tTransactions("type_in_list")}</span>
            <span>{tTransactions("summ_in_list")}</span>
            <span>{tTransactions("category_in_list")}</span>
            <span>{tTransactions("date_in_list")}</span>
            <span>{tTransactions("description_in_list")}</span>
            <span>{tTransactions("action_in_list")}</span>
          </div>

          {/* Transactions */}
          {transactions.map((tx: Transaction, index: number) => (
            <div
              key={`${tx.id}-${index}`}
              className="grid sm:grid-cols-6 grid-cols-1 gap-y-1 gap-x-4 p-3 border rounded-md shadow-sm text-sm sm:items-center"
            >
              {/* Desktop: просто текст */}
              {/* Mobile: Лейбл + значення */}
              <div>
                <span className="sm:hidden">
                  {tTransactions("type_in_list")}
                </span>
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
                <span className="sm:hidden">
                  {tTransactions("summ_in_list")}
                </span>
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
                <span className="sm:hidden">
                  {tTransactions("category_in_list")}
                </span>
                {tAnalytics(`categories.${tx.category}`)}
              </div>

              <div>
                <span className="sm:hidden">
                  {tTransactions("date_in_list")}
                </span>
                {tx.date}
              </div>

              <div className="break-words">
                <span className="sm:hidden">
                  {tTransactions("description_in_list")}
                </span>
                {tx.description || "-"}
              </div>

              <div>
                <span className="sm:hidden">
                  {tTransactions("action_in_list")}
                </span>
                <button
                  onClick={() => handleDelete(tx.id!)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  {tTransactions("action_delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
