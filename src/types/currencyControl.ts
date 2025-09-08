type Currency = "USD" | "EUR" | "UAH" | string;
export interface CurrencyControl {
  selectedCurrency: Currency;
  setCurrency: (currency: Currency) => void;
}
