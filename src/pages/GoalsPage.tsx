import React from "react";
import GoalsMain from "../features/transactions/components/GoalComponent/GoalsMain";
import GoalsList from "../features/transactions/components/GoalComponent/GoalsList";
import Sidebar from "../features/transactions/components/sidebar";

const GoalsPage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-bgBase text-textBase flex flex-col sm:flex-row">
        <Sidebar />
        <div className="py-6 pl-0 sm:pl-4 w-full  mx-auto sm:mx-40">
          <div className="px-5 sm:px-0 gap-6">
            <h1 className="text-2xl font-bold mb-6 text-center sm:text-left text-primary">
              Цілі
            </h1>
            <GoalsMain />
            <GoalsList />
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalsPage;
