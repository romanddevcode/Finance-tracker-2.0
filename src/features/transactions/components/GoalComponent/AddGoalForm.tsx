// components/AddGoalForm.tsx
import React, { useState } from "react";

type AddGoalFormProps = {
  onAdd: (goal: { title: string; targetAmount: number }) => void;
};

const AddGoalForm: React.FC<AddGoalFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState<number | "">("");

  const handleSubmit = () => {
    if (!title || !targetAmount || targetAmount <= 0) return;
    onAdd({ title, targetAmount: Number(targetAmount) });
    setTitle("");
    setTargetAmount("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Нова ціль</h2>
      <input
        type="text"
        placeholder="Назва цілі"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Сума"
        value={targetAmount}
        onChange={(e) => setTargetAmount(parseFloat(e.target.value))}
        className="w-full mb-2 p-2 border rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800"
      >
        Додати ціль
      </button>
    </div>
  );
};

export default AddGoalForm;
