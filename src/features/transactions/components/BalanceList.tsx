import { useTransactions } from "../hooks/useTransactions";
import { getTransactionsStats } from "../utils/calculateBalance";

export const BalanceList = () => {
  const { data: transactions = [] } = useTransactions();

  const { totalIncome, totalExpense, balance } =
    getTransactionsStats(transactions);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-secondary text-textBase p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Баланс</h3>
          <p className="text-2xl font-bold">{balance.toFixed(2)} грн</p>
        </div>
        <div className="bg-secondary text-textBase p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Дохід</h3>
          <p className="text-2xl font-bold">{totalIncome.toFixed(2)} грн</p>
        </div>
        <div className="bg-secondary text-textBase p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Витрати</h3>
          <p className="text-2xl font-bold">{totalExpense.toFixed(2)} грн</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceList;
