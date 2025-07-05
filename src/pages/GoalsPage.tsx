import React, { useState } from "react";
import Sidebar from "../features/transactions/components/sidebar";

import { useGoals } from "../features/transactions/hooks/useGoals";
import {
  useAddGoal,
  useUpdateGoal,
  useDeleteGoal,
} from "../features/transactions/hooks/useGoalMutations";

const GoalsPage: React.FC = () => {
  const { data: goals = [], isLoading } = useGoals();
  const addGoalMutation = useAddGoal();
  const updateGoalMutation = useUpdateGoal();
  const deleteGoalMutation = useDeleteGoal();

  const [newGoal, setNewGoal] = useState({ title: "", targetAmount: 0 });
  const [progressInputs, setProgressInputs] = useState<{
    [key: string]: number;
  }>({});

  const handleAddGoal = async () => {
    if (!newGoal.title.trim() || newGoal.targetAmount <= 0) return;
    const goal = {
      id: Date.now().toString(),
      title: newGoal.title.trim(),
      targetAmount: newGoal.targetAmount,
      currentAmount: 0,
      progress: 0,
    };
    try {
      await addGoalMutation.mutateAsync(goal);
      setNewGoal({ title: "", targetAmount: 0 });
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

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

  const handleDeleteGoal = async (id: string) => {
    try {
      await deleteGoalMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-bgBase text-textBase flex flex-col sm:flex-row">
        <div className="py-6 pl-0 sm:pl-4 w-full  mx-auto sm:mx-40">
          <div className="px-5 sm:px-0 gap-6">
            <h1 className="text-2xl font-bold mb-6 text-center sm:text-left text-primary">
              Цілі
            </h1>
            <h2 className="text-xl font-semibold mb-4">Нова ціль</h2>
            <div className="bg-secondary p-4 rounded-lg shadow mb-6">
              <input
                type="text"
                placeholder="Назва цілі"
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, title: e.target.value })
                }
                className="w-full mb-2 p-2 border rounded text-sm"
              />
              <input
                type="number"
                placeholder="Сума"
                value={newGoal.targetAmount || ""}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    targetAmount: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full mb-2 p-2 border rounded text-sm"
              />
              <button
                onClick={handleAddGoal}
                className="w-full sm:w-auto bg-primary text-textBase px-4 py-2 rounded hover:bg-purple-800 disabled:opacity-50"
              >
                Додати ціль
              </button>
            </div>
            {/* Цели */}
            {isLoading ? (
              <p className="text-textBase">Завантаження...</p>
            ) : goals.length === 0 ? (
              <p className="text-textBase">Цілі відсутні</p>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {goals.map((goal) => {
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
                        backgroundColor: "#e5e7eb",
                      },
                    ],
                  };

                  {
                    /* Блок создания новой цели */
                  }

                  return (
                    <div
                      key={goal.id}
                      className="bg-secondary text-textBase p-4 rounded shadow w-full transition "
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        {goal.title}
                      </h3>
                      <p className="mb-2 text-sm ">
                        Прогрес: {goal.currentAmount} / {goal.targetAmount} грн
                      </p>
                      <div className="min-h-[150px] min-w-[150px] lg:min-h-[300px]">
                        {/* <Bar
                          data={data}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: { position: "bottom" },
                            },
                            scales: {
                              y: { beginAtZero: true, max: goal.targetAmount },
                            },
                          }}
                        /> */}
                      </div>
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                        <input
                          type="number"
                          className="border rounded p-2 w-full sm:w-32 text-sm"
                          placeholder="Сума"
                          value={progressInputs[String(goal.id)] || ""}
                          onChange={(e) =>
                            setProgressInputs((prev) => ({
                              ...prev,
                              [String(goal.id)]:
                                parseFloat(e.target.value) || 0,
                            }))
                          }
                        />
                        <button
                          onClick={() => handleAddProgress(String(goal.id))}
                          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm w-full sm:w-auto"
                        >
                          + Додати прогрес
                        </button>
                        <button
                          onClick={() => handleDeleteGoal(String(goal.id))}
                          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm w-full sm:w-auto"
                        >
                          Видалити
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalsPage;
