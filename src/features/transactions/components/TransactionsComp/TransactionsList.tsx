import { useDeleteTransaction } from "../../hooks/useTransactionsMutation";
import { getTransactionsStats } from "../../utils/calculateBalance";
import { useTransactions } from "../../hooks/useTransactions";
import type { Transaction } from "../../types/transactionInterface";
import { useTranslation } from "react-i18next";
import { useCurrencyStore } from "../../../../store/currencyTypeControl";
import { useCallback } from "react";
import TransactionCard from "./TransactionsCard";

export const TransactionsList: React.FC = () => {
  const { data: transactions = [], isLoading } = useTransactions();
  const { balance } = getTransactionsStats(transactions);

  const { selectedCurrency, setCurrency } = useCurrencyStore();

  const { t: tTransactions } = useTranslation("transactions");

  const deleteTransactionMutation = useDeleteTransaction();

  const handleDelete = useCallback(
    async (id: string) => {
      if (!id) return;
      try {
        await deleteTransactionMutation.mutateAsync(id);
      } catch (error) {
        console.error(error);
      }
    },
    [deleteTransactionMutation]
  );

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
            <TransactionCard
              key={tx.id}
              tx={tx}
              index={index}
              tTransactions={tTransactions}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
