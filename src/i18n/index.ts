import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enAnalytics from "./en/analytics.json";
import enDashboard from "./en/dashboard.json";
import enTransactions from "./en/transactions.json";
import enGoals from "./en/goals.json";
import enBudget from "./en/budget.json";

import uaAnalytics from "./ua/analytics.json";
import uaDashboard from "./ua/dashboard.json";
import uaTransactions from "./ua/transactions.json";
import uaGoals from "./ua/goals.json";
import uaBudget from "./ua/budget.json";

import deAnalytics from "./de/analytics.json";
import deDashboard from "./de/dashboard.json";
import deTransactions from "./de/transactions.json";
import deGoals from "./de/goals.json";
import deBudget from "./de/budget.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ua",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    // ns: ["analytics", "dashboard", "budget", "goals", "transactions"], // какие namespaces мы хотим
    ns: ["dashboard"], // какие namespaces мы хотим
    defaultNS: "analytics",
    resources: {
      en: {
        analytics: enAnalytics,
        dashboard: enDashboard,
        budget: enBudget,
        goals: enGoals,
        transactions: enTransactions,
      },
      ua: {
        analytics: uaAnalytics,
        dashboard: uaDashboard,
        budget: uaBudget,
        goals: uaGoals,
        transactions: uaTransactions,
      },
      de: {
        analytics: deAnalytics,
        dashboard: deDashboard,
        budget: deBudget,
        goals: deGoals,
        transactions: deTransactions,
      },
    },
  });

export default i18n;
