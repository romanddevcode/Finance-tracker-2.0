import React from "react";
import { useAddGoal } from "../Goal/hooks/mutations/useGoalMutations";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  goalsSchema,
  type GoalsFormValues,
} from "../../../validations/goalsSchema";

const GoalsMain: React.FC = () => {
  const addGoalMutation = useAddGoal();

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
    <div className="bg-secondary text-textBase p-4 flex flex-col items-center  lg:items-start rounded-lg shadow mb-6">
      <h2 className="font-bold mb-4 lg:text-2xl text-xl">{t("new_goal")}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full md:flex-row md:items-end"
      >
        <div className="flex flex-col w-full md:w-60">
          <input
            type="text"
            placeholder={t("goal_name")}
            data-testid="goalNameInput"
            {...register("title")}
            required
            className="p-2 border rounded w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col w-full md:w-40">
          <input
            type="number"
            data-testid="goalAmountInput"
            placeholder={t("goal_amount")}
            {...register("targetAmount", { valueAsNumber: true })}
            className="p-2 border rounded w-full"
          />
          {errors.targetAmount && (
            <p className="text-red-500 text-sm">
              {errors.targetAmount.message}
            </p>
          )}
        </div>

        <div className="flex flex-col w-full md:w-32">
          <select
            {...register("currency")}
            className="p-2 border rounded w-full"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="UAH">UAH</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-primary text-white px-4 py-2 rounded hover:bg-purple-800 disabled:opacity-50"
        >
          {t("add_new_goal")}
        </button>
      </form>
    </div>
  );
};

export default GoalsMain;
