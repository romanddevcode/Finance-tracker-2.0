import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../services/api/axios";
import {
  addLocalGoal,
  deleteLocalGoal,
  updateLocalGoal,
} from "../services/goalService";
import type { Goal } from "../types/goalsInterface";
import { useAuth } from "../auth/AuthContext";

export const useAddGoal = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation<Goal, Error, Goal>({
    mutationFn: async (goal: Goal) => {
      if (token && navigator.onLine) {
        const { data } = await API.post<Goal>("/api/goals", goal);
        return data;
      } else {
        await addLocalGoal(goal).catch((error) => console.error(error));
        return goal;
      }
    },
    onMutate: async (newGoal) => {
      await queryClient.cancelQueries({ queryKey: ["goals"] });
      const previousGoals = queryClient.getQueryData<Goal[]>(["goals"]);

      queryClient.setQueryData<Goal[]>(["goals"], (old = []) => [
        ...old,
        newGoal,
      ]);

      return { previousGoals };
    },
    onError: (error: any) => console.error(error),
  });
};

export const useUpdateGoal = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation<Goal, Error, { id: string; data: Partial<Goal> }>({
    mutationFn: async ({ id, data }) => {
      if (token && navigator.onLine) {
        const { data: updatedData } = await API.patch<Goal>(
          `/api/goals/${id}`,
          data
        );
        return updatedData;
      } else {
        await updateLocalGoal(id, data).catch((error) => console.error(error));
        return { id, ...data } as Goal;
      }
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["goals"] });
      const previousGoals = queryClient.getQueryData<Goal[]>(["goals"]);

      queryClient.setQueryData<Goal[]>(["goals"], (old = []) =>
        old.map((g) => (g.id === id ? { ...g, ...data } : g))
      );
      return { previousGoals };
    },
    onError: (error: any) => console.error(error),
  });
};

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation<string, Error, string>({
    mutationFn: async (id: string) => {
      if (token && navigator.onLine) {
        await API.delete(`/api/goals/${id}`);
      } else {
        await deleteLocalGoal(id).catch((error) => console.error(error));
      }
      return id;
    },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ["goals"] });
      const previousGoals = queryClient.getQueryData<Goal[]>(["goals"]);

      queryClient.setQueryData<Goal[]>(["goals"], (old = []) =>
        old.filter((g) => g.id !== deletedId)
      );

      return { previousGoals };
    },
    onError: (error: any) => console.error(error),
  });
};
