import { useMemo } from "react";
import { useCurrencyStore } from "../../../store/currencyTypeControl";
import { useExchangeRates } from "../hooks/useExchangeRates";
import { type Transaction } from "../types/transactionInterface";
import { currencyConventor } from "./currencyConventor";

export const getTransactionsStats = (transactions: Transaction[]) => {
  const { selectedCurrency } = useCurrencyStore();
  const { data: rates } = useExchangeRates();

  // console.log("selectedCurrency", selectedCurrency);
  // console.log("rates", rates);

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
      const convertedAmount = currencyConventor({
        amount: tx.amount,
        fromCurrency: tx.currency,
        toCurrency: selectedCurrency,
        rates,
      });

      // console.log("amount", tx.amount, typeof tx.amount);
      // console.log("convertedAmount", convertedAmount);
      // console.log("fromCurrency", tx.currency);
      // console.log("toCurrency", selectedCurrency);
      // console.log("rates", rates);

      if (tx.type === "income") {
        totalIncome += convertedAmount;
      } else if (tx.type === "expense") {
        totalExpense += convertedAmount;
      }
    }
    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }, [transactions, selectedCurrency, rates]);

  return stats;
};
