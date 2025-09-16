import { useTranslation } from "react-i18next";
import type { Goal } from "./types/goalsInterface";
import React, { useState } from "react";
import GoalGraph from "./GoalGraph";

interface GoalCardProps {
  goal: Goal;
  onAddProgress: (id: string, amount: number) => void;
  onDelete: (id: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = React.memo(
  ({ goal, onAddProgress, onDelete }) => {
    const { t } = useTranslation("goals");
    const [input, setInput] = useState<number>(0);

    const handleAdd = () => {
      if (input <= 0) return;
      const remaining = goal.targetAmount - goal.currentAmount;
      const addAmount = Math.min(input, remaining);
      onAddProgress(goal.id!, addAmount);
      setInput(0);
    };

    const isCompleted = goal.currentAmount >= goal.targetAmount;

    return (
      <div className="bg-secondary text-textBase p-4 rounded-lg shadow transition flex flex-col gap-4">
        <h3 className="font-bold lg:text-2xl text-xl">{goal.title}</h3>

        <p className="text-sm opacity-80">
          {t("progress")} {goal.currentAmount} / {goal.targetAmount}{" "}
          {goal.currency}
        </p>

        <GoalGraph
          data={[
            {
              currentAmount: goal.currentAmount,
              targetAmount: goal.targetAmount,
              name: goal.title,
              currency: goal.currency,
            },
          ]}
        />

        {isCompleted ? (
          <span className="text-green-500 font-semibold text-center">
            ✅ {t("goal_completed")}
          </span>
        ) : (
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
            <input
              type="number"
              min={1}
              max={goal.targetAmount}
              className="border rounded p-2 w-full lg:w-32 text-sm"
              placeholder={t("goal_amount")}
              value={input || ""}
              onChange={(e) => setInput(parseFloat(e.target.value) || 0)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm w-full sm:w-auto"
            >
              {t("add_progress")}
            </button>
          </div>
        )}

        <button
          onClick={() => onDelete(goal.id!)}
          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm w-full sm:w-auto"
        >
          {t("delete_goal")}
        </button>
      </div>
    );
  }
);

export default GoalCard;
