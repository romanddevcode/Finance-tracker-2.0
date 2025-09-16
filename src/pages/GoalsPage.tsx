import React from "react";
import GoalsMain from "../components/features/Goal/GoalsMain";
import GoalsList from "../components/features/Goal/GoalsList";
import Sidebar from "../components/General/Sidebar";
import { useTranslation } from "react-i18next";

const GoalsPage: React.FC = () => {
  const { t } = useTranslation("goals");

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center lg:text-left text-primary">
        {t("main_title")}
      </h1>

      <div className="flex flex-col gap-6">
        <GoalsMain />
        <GoalsList />
      </div>
    </>
  );
};

export default GoalsPage;
