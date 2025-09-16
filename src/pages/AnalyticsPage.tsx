import React from "react";
import Sidebar from "../components/General/Sidebar";
import { useTranslation } from "react-i18next";
import { AnalyticsMain } from "../components/features/Anlaytics/AnalyticsMain";

const AnalyticsPage: React.FC = () => {
  const { t } = useTranslation("analytics");

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center lg:text-left text-primary">
        {t("main_title")}
      </h1>

      <div className="flex flex-col gap-6">
        <AnalyticsMain />
      </div>
    </>
  );
};

export default AnalyticsPage;
