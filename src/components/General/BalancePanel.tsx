import { useTranslation } from "react-i18next";
import { useCurrencyStore } from "../../services/store/currencyStore";
import { useTransactions } from "../features/Transactions/hooks/useTransactions";
import { getTransactionsStats } from "../../utils/transactionsStats";

export const BalancePanel: React.FC = () => {
  const { data: transactions = [] } = useTransactions();
  const { selectedCurrency } = useCurrencyStore();
  const { t } = useTranslation("dashboard");
  const { balance } = getTransactionsStats(transactions);
  return (
    <div className="bg-secondary md:w-full text-center lg:text-left  md:text-2xl text-xl text-textBase p-4 rounded-lg shadow">
      <h3 className="font-bold mb-2">{t("balance_panel")}</h3>
      <p className="font-medium">
        {balance.toFixed(2)} {selectedCurrency}
      </p>
    </div>
  );
};

export default BalancePanel;
