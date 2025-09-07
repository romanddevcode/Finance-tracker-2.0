import { useTranslation } from "react-i18next";
import { useCurrencyStore } from "../../../../store/currencyTypeControl";
import { useTransactions } from "../../hooks/useTransactions";
import { getTransactionsStats } from "../../utils/calculateBalance";

export const BalancePanel: React.FC = () => {
  const { data: transactions = [] } = useTransactions();
  const { selectedCurrency } = useCurrencyStore();
  const { t } = useTranslation("dashboard");
  const { balance } = getTransactionsStats(transactions);
  return (
    <div className="bg-secondary text-textBase p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-2">{t("balance_panel")}</h3>
      <p className="text-2xl font-bold">
        {balance} {selectedCurrency}
      </p>
    </div>
  );
};

export default BalancePanel;
