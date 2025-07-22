import React, { useState } from "react";
import { useGoals } from "../../../../features/transactions/hooks/useGoals";
import {
  useUpdateGoal,
  useDeleteGoal,
} from "../../../../features/transactions/hooks/useGoalMutations";
import GoalGraph from "./GoalGraph";
import { useTranslation } from "react-i18next";

const GoalsList: React.FC = () => {
  const { data: goals = [], isLoading } = useGoals();
  const updateGoalMutation = useUpdateGoal();
  const deleteGoalMutation = useDeleteGoal();
  const [progressInputs, setProgressInputs] = useState<{
    [key: string]: number;
  }>({});
  const handleAddProgress = async (id: string) => {
    const goal = goals.find((g) => g.id === id);
    const amount = progressInputs[id] || 0;
    if (!goal || amount <= 0) return;
    try {
      await updateGoalMutation.mutateAsync({
        id,
        data: { currentAmount: goal.currentAmount + amount },
      });
      setProgressInputs((prev) => ({ ...prev, [id]: 0 }));
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  console.log("goals in arr:", goals);

  const handleDeleteGoal = async (id: string) => {
    try {
      await deleteGoalMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const { t } = useTranslation("goals");

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-secondary text-textBase p-4 rounded shadow w-full transition"
          >
            <h3 className="text-lg font-semibold mb-2">{goal.title}</h3>
            <p className="mb-2 text-sm">
              {t("progress")} {goal.currentAmount} / {goal.targetAmount} грн
            </p>
            <GoalGraph
              data={[
                {
                  currentAmount: goal.currentAmount,
                  targetAmount: goal.targetAmount,
                  name: goal.title,
                },
              ]}
              key={goal.id}
            />
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
              <input
                type="number"
                className="border rounded p-2 w-full sm:w-32 text-sm"
                placeholder={t("goal_amount")}
                value={progressInputs[String(goal.id)] || ""}
                onChange={(e) =>
                  setProgressInputs((prev) => ({
                    ...prev,
                    [String(goal.id)]: parseFloat(e.target.value) || 0,
                  }))
                }
              />
              <button
                onClick={() => handleAddProgress(String(goal.id))}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm w-full sm:w-auto"
              >
                {t("add_progress")}
              </button>
              <button
                onClick={() => handleDeleteGoal(String(goal.id))}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm w-full sm:w-auto"
              >
                {t("delete_goal")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GoalsList;
