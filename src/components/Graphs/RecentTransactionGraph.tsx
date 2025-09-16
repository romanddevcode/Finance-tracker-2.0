import TransactionsList from "../Transactions/TransactionsList";

export const RecentTransactionGraph: React.FC = () => {
  return (
    <div className="bg-secondary p-4 rounded-lg shadow">
      <TransactionsList />
    </div>
  );
};

export default RecentTransactionGraph;
