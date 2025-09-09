import React from "react";
import Sidebar from "../components/General/Sidebar";

import BudgetLimitMain from "../components/features/Budget/BudgetLimitMain";
import { useTranslation } from "react-i18next";

import ExpensePanel from "../components/General/ExpensePanel";
import BalancePanel from "../components/General/BalancePanel";

const BudgetPage: React.FC = () => {
  const { t } = useTranslation("budget");

  return (
    <div className="min-h-screen bg-bgBase flex flex-col sm:flex-row transition">
      <Sidebar />
      <div className="py-6 px-4 sm:px-0 w-full  mx-auto sm:mx-40">
        <h1 className="text-2xl font-bold mb-6 text-center sm:text-left text-primary">
          {t("main_title")}
        </h1>
        <div className="items-center mb-6">
          <BalancePanel />
        </div>

        <BudgetLimitMain />

        <div className="items-center mb-6">
          <ExpensePanel />
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
