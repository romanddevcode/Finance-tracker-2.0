import React from "react";
import Sidebar from "../components/General/Sidebar";

import TransactionsList from "../components/features/Transactions/TransactionsList";
import TransactionsMain from "../components/features/Transactions/TransactionsMain";

const TransactionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bgBase flex flex-col sm:flex-row transition">
      <Sidebar />
      <div className="py-6 px-4 sm:px-0 w-full mx-auto sm:mx-40">
        <TransactionsMain />
        <TransactionsList />
      </div>
    </div>
  );
};

export default TransactionsPage;
