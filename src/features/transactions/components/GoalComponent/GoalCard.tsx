// components/GoalCard.tsx
import React, { useState } from "react";

type Goal = {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
};

type GoalCardProps = {
  goal: Goal;
  onProgressAdd: (id: string, amount: number) => void;
  onDelete: (id: string) => void;
};

const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onProgressAdd,
  onDelete,
}) => {
  const [progress, setProgress] = useState<number | "">("");

  const handleAddProgress = () => {
    if (!progress || progress <= 0) return;
    onProgressAdd(goal.id, Number(progress));
    setProgress("");
  };

  const data = {
    labels: [goal.title],
    datasets: [
      {
        label: "Досягнуто",
        data: [goal.currentAmount],
        backgroundColor: "#8b5cf6",
      },
      {
        label: "Ціль",
        data: [goal.targetAmount],
        backgroundColor: "#ddd",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">{goal.title}</h3>
      <p className="mb-2">
        Прогрес: {goal.currentAmount} / {goal.targetAmount} грн
      </p>
      {/* <Bar
        data={data}
        options={{
          responsive: true,
          plugins: { legend: { position: "bottom" } },
        }}
      /> */}
      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <input
          type="number"
          className="border rounded p-2 w-32"
          placeholder="Сума"
          value={progress}
          onChange={(e) => setProgress(parseFloat(e.target.value))}
        />
        <button
          onClick={handleAddProgress}
          className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          + Додати прогрес
        </button>
        <button
          onClick={() => onDelete(goal.id)}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Видалити
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
