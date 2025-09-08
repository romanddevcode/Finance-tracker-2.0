import { useMemo } from "react";
import { useCurrencyStore } from "../store/currencyStore";
import { useExchangeRates } from "./useExchangeRates";
import { currencyConventor } from "../utils/currencyConventor";
import filterByPeriod from "../utils/filterByPeriod";
import type { Transaction } from "../types/transactionInterface";
import type { Period } from "../types/dateControl";
import type { AccamulatedData } from "../types/analyticsDataInterface";

export const useAnalyticsData = (
  transactions: Transaction[],
  period: Period
) => {
  const { selectedCurrency } = useCurrencyStore();
  const { data: rates } = useExchangeRates();

  const result = useMemo(() => {
    const initialAcc: AccamulatedData = {
      incomeByDate: {},
      expenseByDateAndCategory: {},
      allCategories: new Set(),
      allDates: new Set(),
    };

    if (!rates || !transactions.length) {
      return {
        incomeByDate_StackedData_RAW: {},
        expenseByDateAndCategory_StackedData_RAW: {},
        allDates: [],
        allCategories: [],
      };
    }

    const filtered = transactions.filter((tx) => filterByPeriod(tx, period));

    const stackedData = filtered.reduce((acc, tx) => {
      const date = tx.date;
      acc.allDates.add(date);

      const convertedAmount = Number(
        currencyConventor({
          amount: tx.amount,
          fromCurrency: tx.currency,
          toCurrency: selectedCurrency,
          rates,
        }).toFixed(2)
      );

      if (tx.type === "income") {
        acc.incomeByDate[date] =
          (acc.incomeByDate[date] || 0) + convertedAmount;
      } else if (tx.type === "expense") {
        const category = tx.category || "Other";
        acc.allCategories.add(category);

        if (!acc.expenseByDateAndCategory[date])
          acc.expenseByDateAndCategory[date] = {};
        acc.expenseByDateAndCategory[date][category] =
          (acc.expenseByDateAndCategory[date][category] || 0) + convertedAmount;
      }

      return acc;
    }, initialAcc);

    const allCategories = Array.from(stackedData.allCategories);

    const allDates = Array.from(stackedData.allDates).sort(
      () => new Date().getTime() - new Date().getTime()
    ); //Sort dates from newest to oldest

    return {
      incomeByDate_StackedData_RAW: stackedData.incomeByDate,
      expenseByDateAndCategory_StackedData_RAW:
        stackedData.expenseByDateAndCategory,
      allDates,
      allCategories,
    };
  }, [transactions, period]);

  return result;
};
