import { useCurrencyStore } from "../../../store/currencyTypeControl";

export const CurrencySelector = () => {
  const { selectedCurrency, setCurrency } = useCurrencyStore();

  return (
    <select
      value={selectedCurrency}
      onChange={(e) => setCurrency(e.target.value as any)}
    >
      <option value="EUR">EUR</option>
      <option value="USD">USD</option>
      <option value="PLN">PLN</option>
    </select>
  );
};
