import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useThemeStore } from "./store/uiStore.ts";

import "./index.css";

import Dashboard from "./pages/Dashboards.tsx";
import TransactionsPage from "./pages/TransactionsPage.tsx";
import Budget from "./pages/Budget.tsx";
import Analytics from "./pages/Analytics.tsx";
import GoalsPage from "./pages/GoalsPage.tsx";
import { AuthProvider } from "./features/transactions/auth/AuthContext.tsx";

const queryClient = new QueryClient();

const App = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Budget" element={<Budget />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/Goals" element={<GoalsPage />} />
        <Route path="/Transactions" element={<TransactionsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
