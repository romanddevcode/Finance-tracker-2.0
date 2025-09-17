import { useTranslation } from "react-i18next";
import useSetBudgetLimit from "./hooks/mutations/useBudgetLimitMutations";
import type { SettingsLimit } from "./types/settingsLimit";
import { useBudgetLimit } from "./hooks/useBudgetLimit";
import { getTransactionsStats } from "../../../utils/transactionsStats";
import { useTransactions } from "../Transactions/hooks/useTransactions";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  budgetLimitSchema,
  type BudgetLimitFormValues,
} from "../../../validations/budgetLimitSchema";
import useBalanceStateLimit from "../../../services/store/balanceStateLimitStore";
import { useEffect } from "react";
import { currencyConventor } from "../../../utils/currencyConventor";
import { useCurrencyStore } from "../../../services/store/currencyStore";
import { useExchangeRates } from "../../../hooks/useExchangeRates";

export const BudgetLimitMain: React.FC = () => {
  const { t } = useTranslation("budget");

  const { selectedCurrency } = useCurrencyStore();

  const { data: budgetLimit } = useBudgetLimit();

  const { isOverLimit, setIsOverLimit } = useBalanceStateLimit();

  const mutation = useSetBudgetLimit();

  const { data: transactions = [] } = useTransactions();
  const { data: rates } = useExchangeRates();
  const { totalExpense } = getTransactionsStats(transactions);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<BudgetLimitFormValues>({
    resolver: zodResolver(budgetLimitSchema),
    defaultValues: {
      limit: 1,
      currency: selectedCurrency,
      isActivated: false,
    },
  });

  const onSubmit = async (data: BudgetLimitFormValues) => {
    const newSettings: SettingsLimit = {
      id: budgetLimit?.id ?? Date.now().toString(),
      value: data.limit,
      currency: data.currency,
      isActivated: data.isActivated,
    };

    try {
      await mutation.mutateAsync(newSettings);
    } catch (err) {
      console.error("Failed to update budget limit", err);
    }
  };

  const toggleActivation = async (newValue: boolean) => {
    if (!budgetLimit) return;

    try {
      await mutation.mutateAsync({
        ...budgetLimit,
        isActivated: newValue,
      });
    } catch (err) {
      console.error("Failed to toggle budget limit", err);
    }
  };

  const handleClear = async () => {
    const newSettings: SettingsLimit = {
      id: budgetLimit?.id ?? Date.now().toString(),
      value: 0,
      currency: budgetLimit?.currency ?? "EUR",
      isActivated: budgetLimit?.isActivated ?? true,
    };

    try {
      await mutation.mutateAsync(newSettings);
      setIsOverLimit(false);
      reset({ limit: newSettings.value, isActivated: newSettings.isActivated });
    } catch (err) {
      console.error("Failed to clear budget limit", err);
    }
  };

  useEffect(() => {
    if (!rates) return;

    const convertedLimit = currencyConventor({
      amount: budgetLimit?.value ?? 0,
      fromCurrency: budgetLimit?.currency ?? "EUR",
      toCurrency: selectedCurrency,
      rates,
    });

    setIsOverLimit(totalExpense > convertedLimit && watch("isActivated"));
  }, [
    selectedCurrency,
    rates,
    watch("isActivated"),
    budgetLimit?.value,
    totalExpense,
  ]);

  useEffect(() => {
    if (budgetLimit) {
      reset({
        limit: budgetLimit?.value ?? 0,
        currency: budgetLimit?.currency ?? "EUR",
        isActivated: budgetLimit?.isActivated ?? false,
      });
    }
  }, [budgetLimit]);

  return (
    <div className="bg-secondary text-center md:text-left text-textBase p-4 rounded-lg shadow ">
      <h2 className="font-bold mb-4 lg:text-2xl text-xl">{t("limit")}</h2>

      {errors?.limit && (
        <p className="text-red-500 transition duration-300 ease-in">
          {errors.limit?.message}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div className="flex items-center gap-2">
          <input
            {...register("limit", { valueAsNumber: true })}
            type="number"
            min={1}
            className="border p-2 rounded  text-base"
            disabled={!watch("isActivated")}
          />
          <select
            {...register("currency")}
            className="border p-2 rounded  text-base"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="UAH">UAH</option>
          </select>
          <Controller
            name="isActivated"
            control={control}
            render={({ field }) => (
              <label className="flex justify-center items-center gap-2">
                <input
                  type="checkbox"
                  checked={field.value}
                  disabled={mutation.isPending}
                  onChange={async (e) => {
                    const newValue = e.target.checked;
                    field.onChange(newValue);
                    toggleActivation(newValue);
                  }}
                />
                <span>{t("enable_limit")}</span>
              </label>
            )}
          />
        </div>

        {watch("isActivated") && (
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              {t("apply_limit")}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-500 text-white px-3 py-2 rounded"
            >
              {t("clear_limit")}
            </button>
          </div>
        )}
      </form>

      {isOverLimit && (
        <p className="text-red-500 mt-2 font-semibold text-center">
          {t("limit_warning")}
        </p>
      )}
    </div>
  );
};

export default BudgetLimitMain;
