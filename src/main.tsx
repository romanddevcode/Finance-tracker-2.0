import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useThemeStore } from "./services/store/themeStore.ts";
import i18n from "./services/i18n/index.ts";

import "./index.css";

import DashboardPage from "./pages/DashboardPage.tsx";
import TransactionsPage from "./pages/TransactionsPage.tsx";
import BudgetPage from "./pages/BudgetPage.tsx";
import AnalyticsPage from "./pages/AnalyticsPage.tsx";
import GoalsPage from "./pages/GoalsPage.tsx";
import { AuthProvider } from "./auth/AuthContext.tsx";
import { I18nextProvider } from "react-i18next";
import SidebarMenuComponent from "./components/General/Sidebar.tsx";
import Layout from "./components/General/Layout.tsx";
import { LanguageProvider } from "./components/General/LanguageProvider.tsx";

const queryClient = new QueryClient();

const App = () => {
  const { themeController } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    themeController === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
  }, [themeController]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/Budget" element={<BudgetPage />} />
          <Route path="/Analytics" element={<AnalyticsPage />} />
          <Route path="/Goals" element={<GoalsPage />} />
          <Route path="/Transactions" element={<TransactionsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </AuthProvider>
      </I18nextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
