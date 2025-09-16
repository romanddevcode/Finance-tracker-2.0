import { useDeleteTransaction } from "./hooks/mutations/useTransactionsMutation";
import { getTransactionsStats } from "../../../utils/transactionsStats";
import { useTransactions } from "./hooks/useTransactions";
import type { Transaction } from "./types/transactionInterface";
import { useTranslation } from "react-i18next";
import { useCurrencyStore } from "../../../services/store/currencyStore";
import { useCallback, useEffect, useState } from "react";
import TransactionCard from "./TransactionsCard";
import ErrorPopup from "@/components/General/ErrorPopup";

export const TransactionsList: React.FC = () => {
  const { data: transactions = [], isLoading, error } = useTransactions();
  const { balance } = getTransactionsStats(transactions);

  const [errorMessagePopup, setErrorMessagePopup] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (transactions.isError) {
      setErrorMessagePopup(transactions.error.message);
    } else {
      setErrorMessagePopup(null);
    }
  }, [transactions.isError, transactions.error]);

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
    <div className="bg-secondary text-textBase p-6 mb-4 rounded-lg shadow-md text-center md:text-left">
      {errorMessagePopup && (
        <ErrorPopup key={errorMessagePopup} errorMessage={errorMessagePopup} />
      )}
      {error && (
        <p className="text-red-500 transition duration-300 ease-in">
          {error.message}
        </p>
      )}
      <h2 className="font-bold mb-4 lg:text-2xl text-xl">
        {tTransactions("list_of_transactions")}
      </h2>

      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <p className="font-semibold">
          {tTransactions("current_balance")} {balance.toFixed(2)}{" "}
          {selectedCurrency}
        </p>
        <p className="font-semibold">
          {tTransactions("select_currency")}

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
        </p>
      </div>

      {isLoading ? (
        <p>{tTransactions("loading")}</p>
      ) : transactions.length === 0 ? (
        <p className="text-textBase">{tTransactions("no_transactions")}</p>
      ) : (
        <div className="space-y-3 md:max-h-[400px] md:overflow-y-auto">
          <div className="hidden sm:grid grid-cols-6 gap-4 p-2 rounded text-textBase">
            <span>{tTransactions("type_in_list")}</span>
            <span>{tTransactions("summ_in_list")}</span>
            <span>{tTransactions("category_in_list")}</span>
            <span>{tTransactions("date_in_list")}</span>
            <span>{tTransactions("description_in_list")}</span>
            <span>{tTransactions("action_in_list")}</span>
          </div>

          <div className="space-y-3">
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
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
