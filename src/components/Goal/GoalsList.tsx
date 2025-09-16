import React, { useCallback } from "react";
import { useGoals } from "../../hooks/useGoals";
import { useUpdateGoal, useDeleteGoal } from "../../hooks/useGoalMutations";

import GoalCard from "./GoalCard";

const GoalsList: React.FC = () => {
  const { data: goals = [] } = useGoals();
  const updateGoalMutation = useUpdateGoal();
  const deleteGoalMutation = useDeleteGoal();

  const handleAddProgress = useCallback(
    async (id: string, amount: number) => {
      const goal = goals.find((g) => g.id === id);
      if (!goal || amount <= 0) return;
      try {
        await updateGoalMutation.mutateAsync({
          id,
          data: { currentAmount: goal.currentAmount + amount },
        });
      } catch (error) {
        console.error(error);
      }
    },
    [goals, updateGoalMutation]
  );

  const handleDeleteGoal = useCallback(
    async (id: string) => {
      try {
        await deleteGoalMutation.mutateAsync(id);
      } catch (error) {
        console.error(error);
      }
    },
    [deleteGoalMutation]
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onAddProgress={handleAddProgress}
          onDelete={handleDeleteGoal}
        />
      ))}
    </div>
  );
};

export default GoalsList;
