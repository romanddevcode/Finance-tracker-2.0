import React from "react";
import TransactionsList from "../components/features/Transactions/TransactionsList";
import TransactionsMain from "../components/features/Transactions/TransactionsMain";
import { useTranslation } from "react-i18next";

const TransactionsPage: React.FC = () => {
  const { t } = useTranslation("transactions");

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center lg:text-left text-primary">
        {t("main_title")}
      </h1>

      <div className="flex flex-col gap-6">
        <TransactionsMain />
        <TransactionsList />
      </div>
    </>
  );
};

export default TransactionsPage;
