import React from "react";
import Sidebar from "../components/General/Sidebar";

import BudgetLimitMain from "../components/features/Budget/BudgetLimitMain";
import { useTranslation } from "react-i18next";

import ExpensePanel from "../components/General/ExpensePanel";
import BalancePanel from "../components/General/BalancePanel";

const BudgetPage: React.FC = () => {
  const { t } = useTranslation("budget");

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center lg:text-left text-primary">
        {t("main_title")}
      </h1>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <BalancePanel />
          <ExpensePanel />
        </div>
        <BudgetLimitMain />
      </div>
    </>
  );
};

export default BudgetPage;
