import TransactionsList from "../TransactionsComp/TransactionsList";

export const RecentTransactionGraph: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <TransactionsList />
    </div>
  );
};

export default RecentTransactionGraph;
