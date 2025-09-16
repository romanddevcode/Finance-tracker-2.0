import TransactionsList from "../features/Transactions/TransactionsList";

export const RecentTransactionGraph: React.FC = () => {
  return (
    <div className="mb-6">
      <TransactionsList />
    </div>
  );
};

export default RecentTransactionGraph;
