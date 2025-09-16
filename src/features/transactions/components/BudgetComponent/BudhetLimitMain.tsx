import { useTranslation } from "react-i18next";
import { useBudgetLimit } from "../../hooks/useBudgetLimit";
import { useTransactions } from "../../hooks/useTransactions";
import { getTransactionsStats } from "../../utils/calculateBalance";

export const BudgetLimitMain: React.FC = () => {
  const { data: transactions = [], isLoading } = useTransactions();
  const { totalExpense } = getTransactionsStats(transactions); // наші витрати

  const { t } = useTranslation("budget");

  const {
    limit,
    isLimitActive,
    overLimit,
    handleLimitChange,
    toggleLimitState,
  } = useBudgetLimit(totalExpense);

  return (
    <div className="bg-secondary text-textBase p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium mb-4">{t("limit")}</h3>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="number"
          className="border p-2 rounded w-full sm:w-40"
          placeholder={t("limit_placeholder")}
          value={limit ?? ""}
          onChange={handleLimitChange}
          disabled={!isLimitActive}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isLimitActive}
            onChange={toggleLimitState}
          />
          <span className="text-sm">{t("enable_limit")}</span>
        </label>
      </div>

      {overLimit && (
        <p className="text-red-500 mt-2 font-semibold text-sm sm:text-base">
          {t("limit_warning")}
        </p>
      )}
    </div>
  );
};

export default BudgetLimitMain;
