// src/features/goals/hooks/useGoalMutations.ts
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

  return useMutation({
    mutationFn: async (goal: Goal) => {
      if (token) {
        await API.post("/api/goals", goal);
      }
      await addLocalGoal(goal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

export const useUpdateGoal = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Goal> }) => {
      if (token) {
        await API.patch(`/api/goals/${id}`, data);
      }
      await updateLocalGoal(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      if (token) {
        await API.delete(`/api/goals/${id}`);
      }
      await deleteLocalGoal(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};
