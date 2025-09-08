import { useTranslation } from "react-i18next";
import { useCurrencyStore } from "../../store/currencyStore";
import { useTransactions } from "../../hooks/useTransactions";
import { getTransactionsStats } from "../../utils/transactionsStats";

export const IncomePanel: React.FC = () => {
  const { data: transactions = [] } = useTransactions();
  const { selectedCurrency } = useCurrencyStore();
  const { t } = useTranslation("dashboard");
  const { totalIncome } = getTransactionsStats(transactions);
  return (
    <div className="bg-secondary text-textBase p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-2">{t("income_panel")}</h3>
      <p className="text-2xl font-bold">
        {totalIncome} {selectedCurrency}
      </p>
    </div>
  );
};

export default IncomePanel;
