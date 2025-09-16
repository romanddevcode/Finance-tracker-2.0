import { useTranslation } from "react-i18next";
import type { Goal } from "../../types/goalsInterface";
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
      if (goal.currentAmount + input > goal.targetAmount) return;
      onAddProgress(goal.id!, input);
      setInput(0);
    };
    return (
      <div className="bg-secondary text-textBase p-4 rounded shadow w-full transition">
        <h3 className="text-lg font-semibold mb-2">{goal.title}</h3>
        <p className="mb-2 text-sm">
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
          key={goal.id} // key тут опционально, React.memo + массив сверху решает
        />
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
          <input
            type="number"
            min={1}
            max={goal.targetAmount}
            className={`border rounded p-2 w-full sm:w-32 text-sm ${
              goal.currentAmount === goal.targetAmount ? "hidden" : ""
            }`}
            placeholder={t("goal_amount")}
            value={input || ""}
            onChange={(e) => setInput(parseFloat(e.target.value) || 0)}
          />
          <button
            onClick={handleAdd}
            className={`bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm w-full sm:w-auto ${
              goal.currentAmount === goal.targetAmount ? "hidden" : ""
            }`}
          >
            {t("add_progress")}
          </button>
          <button
            onClick={() => onDelete(goal.id!)}
            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm w-full sm:w-auto"
          >
            {t("delete_goal")}
          </button>
        </div>
      </div>
    );
  }
);

export default GoalCard;
