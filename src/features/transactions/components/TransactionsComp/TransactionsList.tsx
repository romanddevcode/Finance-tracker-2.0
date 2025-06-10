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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Список транзакцій</h2>
      <p className="text-lg mb-4">Поточний баланс: {balance.toFixed(2)} грн</p>

      {isLoading ? (
        <p>Завантаження...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-500">Транзакції відсутні.</p>
      ) : (
        <div className="space-y4 max-h-[400px] overflow-y-auto">
          {/* Desktop Table Header (скрываем на мобилках) */}
          <div className="hidden sm:grid grid-cols-6 gap-5 bg-gray-100 p-2 rounded font-medium text-sm text-gray-700">
            <span>Тип</span>
            <span>Сума</span>
            <span>Категорія</span>
            <span>Дата</span>
            <span>Опис</span>
            <span>Дія</span>
          </div>

          {transactions.map((tx: Transaction, index: number) => (
            <div
              key={`${tx.id}-${index}`}
              className="grid grid-cols-1 sm:grid-cols-6 sm:items-center gap-2 p-3 border rounded"
            >
              {/* Мобильный вид: показываем лейблы */}
              <div className="sm:hidden text-sm text-gray-500">Тип</div>
              <div
                className={`${
                  tx.type === "income" ? "text-green-500" : "text-red-500"
                }`}
              >
                {tx.type === "income" ? "Дохід" : "Витрата"}
              </div>

              <div className="sm:hidden text-sm text-gray-500">Сума</div>
              <div
                className={`${
                  tx.type === "income" ? "text-green-500" : "text-red-500"
                }`}
              >
                {tx.type === "income" ? "+" : "-"} {tx.amount.toFixed(2)} грн
              </div>

              <div className="sm:hidden text-sm text-gray-500">Категорія</div>
              <div>{tx.category}</div>

              <div className="sm:hidden text-sm text-gray-500">Дата</div>
              <div>{tx.date}</div>

              <div className="sm:hidden text-sm text-gray-500">Опис</div>
              <div>{tx.description || "-"}</div>

              <div className="sm:hidden text-sm text-gray-500">Дія</div>
              <div>
                <button
                  onClick={() => handleDelete(tx.id!)}
                  className="text-red-500 hover:text-red-700 text-sm"
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
