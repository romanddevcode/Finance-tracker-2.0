// Обновлённый Transaction.tsx с вынесенной логикой и импортами из новых модулей
import React from "react";
import Sidebar from "../features/transactions/components/sidebar";

import TransactionsList from "../features/transactions/components/TransactionsComp/TransactionsList";
import TransactionsMain from "../features/transactions/components/TransactionsComp/TransactionsMain";

const TransactionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex pr-10 sm:pr-0">
      <Sidebar />
      <div className="py-6 pl-4 w-full max-w-4xl mx-auto sm:mx-40">
        {/* Главная */}
        <TransactionsMain />

        {/* Список */}
        <TransactionsList />
      </div>
    </div>
  );
};

export default TransactionsPage;
