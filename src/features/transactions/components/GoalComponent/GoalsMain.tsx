import React, { useEffect, useState } from "react";
import { useAddGoal } from "../../../../features/transactions/hooks/useGoalMutations";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  goalsSchema,
  type GoalsFormValues,
} from "../../../../validations/goalsSchema";
import ErrorPopup from "../GeneralComponents/ErrorPopup";

const GoalsMain: React.FC = () => {
  const addGoalMutation = useAddGoal();
  const [errorMessagePopup, setErrorMessagePopup] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GoalsFormValues>({
    resolver: zodResolver(goalsSchema),
    defaultValues: {
      title: "",
      targetAmount: 1,
      currency: "EUR",
    },
  });

  useEffect(() => {
    if (addGoalMutation.isError) {
      setErrorMessagePopup(addGoalMutation.error.message);
    } else {
      setErrorMessagePopup(null);
    }
  }, [addGoalMutation.isError, addGoalMutation.error]);

  const { t } = useTranslation("goals");

  const onSubmit = async (data: GoalsFormValues) => {
    if (!data.title.trim() || data.targetAmount <= 0) return;

    const goal = {
      id: Date.now().toString(),
      title: data.title.trim(),
      targetAmount: data.targetAmount,
      currentAmount: 0,
      currency: data.currency,
    };

    try {
      await addGoalMutation.mutateAsync(goal);
      reset();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  return (
    <div>
      {errorMessagePopup && (
        <ErrorPopup key={errorMessagePopup} errorMessage={errorMessagePopup} />
      )}
      <h2 className="text-xl font-semibold mb-4">{t("new_goal")}</h2>
      <div className="bg-secondary p-4 rounded-lg shadow mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title?.message}</p>
          )}
          <input
            type="text"
            placeholder={t("goal_name")}
            data-testid="goalNameInput"
            {...register("title")}
            required
            className="w-full mb-2 p-2 border rounded text-sm"
          />
          {errors.targetAmount && (
            <p className="text-red-500 text-sm">
              {errors.targetAmount?.message}
            </p>
          )}
          <input
            type="number"
            data-testid="goalAmountInput"
            placeholder={t("goal_amount")}
            {...register("targetAmount", { valueAsNumber: true })}
            className="w-full mb-2 p-2 border rounded text-sm"
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
          <button
            type="submit"
            className="w-full sm:w-auto bg-primary text-white px-4 py-2 rounded hover:bg-purple-800 disabled:opacity-50"
          >
            {t("add_new_goal")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoalsMain;
