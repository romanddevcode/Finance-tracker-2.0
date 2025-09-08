import { useEffect, useState } from "react";
import { useAddTransaction } from "../../hooks/useTransactionsMutation";
import type { Transaction } from "../../types/transactionInterface";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  trsancationsSchema,
  type TransactionsFormValues,
} from "../../../../validations/transactionsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorPopup from "../GeneralComponents/ErrorPopup";
import useBalanceStateLimit from "../../../../store/balanceStateLimit";
import WarningPopup from "../GeneralComponents/WarningPopup";

export const TransactionsMain: React.FC = () => {
  const addTransactionMutation = useAddTransaction();
  const [errorMessagePopup, setErrorMessagePopup] = useState<string | null>(
    null
  );
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  useEffect(() => {
    if (addTransactionMutation.isError) {
      setErrorMessagePopup(addTransactionMutation.error.message);
    } else {
      setErrorMessagePopup(null);
    }
  }, [addTransactionMutation.isError, addTransactionMutation.error]);

  const { isOverLimit } = useBalanceStateLimit();

  const { t } = useTranslation("transactions");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionsFormValues>({
    resolver: zodResolver(trsancationsSchema),
    defaultValues: {
      amount: 0,
      currency: "EUR",
      type: "expense",
      category: "Products",
      date: new Date().toISOString().slice(0, 10),
      description: "",
    },
  });

  const onSubmit = async (data: TransactionsFormValues) => {
    if (isOverLimit && data.type === "expense")
      return setTimeout(
        () => setWarningMessage(t("warning_message")),
        500,
        setWarningMessage(null)
      );
    if (data.amount <= 0) return;
    const newTransaction: Transaction = {
      ...data,
      id: Date.now().toString(),
    };

    try {
      await addTransactionMutation.mutateAsync(newTransaction);
      reset({
        amount: 0,
        date: new Date().toISOString().slice(0, 10),
        description: "",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left text-primary">
        {t("main_title")}
      </h1>

      {errorMessagePopup && (
        <ErrorPopup key={errorMessagePopup} errorMessage={errorMessagePopup} />
      )}

      {warningMessage && (
        <WarningPopup key={warningMessage} warningMessage={warningMessage} />
      )}
      {/* Форма */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-secondary text-textBase p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {t("new_transaction_add")}
          </h2>
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium  mb-1">
                {t("summ")}

                <input
                  {...register("amount", { valueAsNumber: true })}
                  type="number"
                  min={1}
                  className="w-full  rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
                  placeholder={t("summ_placeholder")}
                  required
                />
                <select {...register("currency")}>
                  <option value="EUR" className="bg-secondary">
                    EUR
                  </option>
                  <option value="USD" className="bg-secondary">
                    USD
                  </option>
                  <option value="UAH" className="bg-secondary">
                    UAH
                  </option>
                </select>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium  mb-1">
                {t("type")}
              </label>
              <select
                {...register("type")}
                className="w-full  rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
              >
                <option value="expense" className="bg-secondary">
                  {t("transaction_type_expense")}
                </option>
                <option value="income" className="bg-secondary">
                  {t("transaction_type_income")}
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium  mb-1">
                {t("category")}
              </label>
              <select
                {...register("category")}
                className="w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
              >
                <option value="Products" className="bg-secondary">
                  {t("category_type_products")}
                </option>
                <option value="Transport" className="bg-secondary">
                  {t("category_type_transport")}
                </option>
                <option value="Fun" className="bg-secondary">
                  {t("category_type_fun")}
                </option>
                <option value="Other" className="bg-secondary">
                  {t("category_type_other")}
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium  mb-1">
                {t("date")}
              </label>
              <input
                type="date"
                {...register("date")}
                className="w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium  mb-1">
                {t("description")}
              </label>
              <textarea
                {...register("description")}
                className="w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2 min-h-20 resize-none"
                placeholder={t("description_placeholder")}
                rows={3}
                maxLength={60}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-primary text-white py-2 px-4 rounded hover:bg-purple-700 transition"
          >
            {t("new_transaction_add")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionsMain;
