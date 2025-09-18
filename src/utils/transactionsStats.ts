import { useMemo } from "react";
import { useCurrencyStore } from "../services/store/currencyStore";
import { useExchangeRates } from "../hooks/useExchangeRates";
import { type Transaction } from "../components/features/Transactions/types/transactionInterface";
import { currencyConventor } from "./currencyConventor";

export const getTransactionsStats = (transactions: Transaction[]) => {
  const { selectedCurrency } = useCurrencyStore();
  const { data: rates } = useExchangeRates();

  const stats = useMemo(() => {
    if (!rates || !transactions.length)
      return {
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
      };

    let totalIncome = 0;
    let totalExpense = 0;

    for (const tx of transactions) {
      const cents = Math.round(
        currencyConventor({
          amount: tx.amount,
          fromCurrency: tx.currency,
          toCurrency: selectedCurrency,
          rates,
        }) * 100
      );

      if (tx.type === "income") totalIncome += cents;
      else if (tx.type === "expense") totalExpense += cents;
    }

    return {
      totalIncome: totalIncome / 100,
      totalExpense: totalExpense / 100,
      balance: (totalIncome - totalExpense) / 100,
    };
  }, [transactions, selectedCurrency, rates]);

  return stats;
};
