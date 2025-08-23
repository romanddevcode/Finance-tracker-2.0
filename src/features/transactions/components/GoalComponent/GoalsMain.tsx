import React, { useState } from "react";
import { useAddGoal } from "../../../../features/transactions/hooks/useGoalMutations";
import { useTranslation } from "react-i18next";

const GoalsMain: React.FC = () => {
  const addGoalMutation = useAddGoal();

  const [newGoal, setNewGoal] = useState({
    title: "",
    targetAmount: 0,
    currency: "EUR",
  });

  const { t } = useTranslation("goals");

  const handleAddGoal = async () => {
    if (!newGoal.title.trim() || newGoal.targetAmount <= 0) return;

    const goal = {
      id: Date.now().toString(),
      title: newGoal.title.trim(),
      targetAmount: newGoal.targetAmount,
      currentAmount: 0,

      currency: newGoal.currency,
    };

    try {
      await addGoalMutation.mutateAsync(goal);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
    setNewGoal({ title: "", targetAmount: 0, currency: "EUR" });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t("new_goal")}</h2>
      <div className="bg-secondary p-4 rounded-lg shadow mb-6">
        <input
          type="text"
          placeholder={t("goal_name")}
          data-testid="goalNameInput"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          className="w-full mb-2 p-2 border rounded text-sm"
        />
        <input
          type="number"
          data-testid="goalAmountInput"
          placeholder={t("goal_amount")}
          value={newGoal.targetAmount || ""}
          onChange={(e) =>
            setNewGoal({
              ...newGoal,
              targetAmount: parseFloat(e.target.value) || 0,
            })
          }
          className="w-full mb-2 p-2 border rounded text-sm"
        />
        <select
          name="currency"
          value={newGoal.currency}
          onChange={(e) =>
            setNewGoal({
              ...newGoal,
              currency: e.target.value,
            })
          }
        >
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
          onClick={handleAddGoal}
          className="w-full sm:w-auto bg-primary text-white px-4 py-2 rounded hover:bg-purple-800 disabled:opacity-50"
        >
          {t("add_new_goal")}
        </button>
      </div>
    </div>
  );
};

export default GoalsMain;
