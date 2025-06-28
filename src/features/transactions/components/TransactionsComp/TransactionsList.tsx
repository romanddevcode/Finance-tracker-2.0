import { useDeleteTransaction } from "../../hooks/useTransactionsMutation";
import { getTransactionsStats } from "../../utils/calculateBalance";
import { useTransactions } from "../../hooks/useTransactions";
import type { Transaction } from "../../types/transactionInterface";

export const TransactionsList: React.FC = () => {
  const { data: transactions = [], isLoading } = useTransactions();
  const { balance } = getTransactionsStats(transactions);

  const deleteTransactionMutation = useDeleteTransaction();

  const handleDelete = async (id: string) => {
    await deleteTransactionMutation.mutateAsync(id);
  };

  return (
    <div className="bg-secondary text-textBase p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Список транзакцій</h2>
      <p className="text-lg mb-4">Поточний баланс: {balance.toFixed(2)} грн</p>

      {isLoading ? (
        <p>Завантаження...</p>
      ) : transactions.length === 0 ? (
        <p className="text-textBase">Транзакції відсутні.</p>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {/* Table Header для desktop */}
          <div className="hidden sm:grid grid-cols-6 gap-4  p-2 rounded font-medium text-sm text-textBase">
            <span>Тип</span>
            <span>Сума</span>
            <span>Категорія</span>
            <span>Дата</span>
            <span>Опис</span>
            <span>Дія</span>
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
                <span className="sm:hidden">Тип: </span>
                <span
                  className={`font-semibold ${
                    tx.type === "income" ? "text-income" : "text-expense"
                  }`}
                >
                  {tx.type === "income" ? "Дохід" : "Витрата"}
                </span>
              </div>

              <div>
                <span className="sm:hidden">Сума: </span>
                <span
                  className={`${
                    tx.type === "income" ? "text-income" : "text-expense"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"} {tx.amount.toFixed(2)} грн
                </span>
              </div>

              <div>
                <span className="sm:hidden">Категорія: </span>
                {tx.category}
              </div>

              <div>
                <span className="sm:hidden">Дата: </span>
                {tx.date}
              </div>

              <div className="break-words">
                <span className="sm:hidden">Опис: </span>
                {tx.description || "-"}
              </div>

              <div>
                <span className="sm:hidden">Дія: </span>
                <button
                  onClick={() => handleDelete(tx.id!)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Видалити
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
