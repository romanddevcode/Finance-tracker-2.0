import React from "react";
import Sidebar from "../features/transactions/components/sidebar";

import TransactionsList from "../features/transactions/components/TransactionsComp/TransactionsList";
import TransactionsMain from "../features/transactions/components/TransactionsComp/TransactionsMain";

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
