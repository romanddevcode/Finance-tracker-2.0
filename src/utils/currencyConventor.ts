export function currencyConventor({
  amount,
  fromCurrency,
  toCurrency,
  rates,
}: {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  rates: Record<string, number>;
}) {
  if (fromCurrency === toCurrency) return amount;

  const usdToFrom = rates[fromCurrency];
  const usdToTo = rates[toCurrency];

  if (!usdToFrom || !usdToTo) {
    console.warn("Одна из валют не найдена в rates:", {
      fromCurrency,
      toCurrency,
    });
    return NaN;
  }

  // перевести fromCurrency → USD → toCurrency
  const inUSD = amount / usdToFrom;
  const result = inUSD * usdToTo;

  return result;
}
