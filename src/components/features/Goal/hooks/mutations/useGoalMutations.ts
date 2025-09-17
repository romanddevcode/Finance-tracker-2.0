import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../../../../services/api/axios";
import {
  addLocalGoal,
  deleteLocalGoal,
  updateLocalGoal,
} from "../../../../../services/goalService";
import type { Goal } from "./../../types/goalsInterface";
import { useAuth } from "../../../../../auth/AuthContext";
import { useNotificationStore } from "@/services/store/notificationStore";
import { useTranslation } from "react-i18next";

export const useAddGoal = () => {
  const { t } = useTranslation("query");
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const queryKeyHandler =
    token && navigator.onLine ? ["goals", "server"] : ["goals", "local"];

  return useMutation({
    mutationFn: async (goal: Goal) => {
      if (token && navigator.onLine) {
        const { data } = await API.post<Goal>("/api/goals", goal);
        return data;
      } else {
        await addLocalGoal(goal).catch((error) => console.error(error));
      }
      return goal;
    },
    onMutate: async (newGoal) => {
      await queryClient.cancelQueries({ queryKey: queryKeyHandler });
      const previousGoals = queryClient.getQueryData<Goal[]>(queryKeyHandler);

      queryClient.setQueryData<Goal[]>(queryKeyHandler, (old = []) => [
        ...old,
        newGoal,
      ]);

      return { previousGoals };
    },
    onError: (error, _newGoal, context) => {
      if (context?.previousGoals) {
        queryClient.setQueryData<Goal[]>(
          queryKeyHandler,
          context.previousGoals
        );
      }
      addNotification("error", t("goal_add_error"));
      console.error(error);
    },
    onSuccess: () => {
      addNotification("success", t("goal_add_success"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyHandler });
    },
  });
};

export const useUpdateGoal = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { t } = useTranslation("query");

  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const queryKeyHandler =
    token && navigator.onLine ? ["goals", "server"] : ["goals", "local"];

  return useMutation<
    Goal,
    Error,
    { id: string; data: Partial<Goal> },
    { previousGoals?: Goal[] }
  >({
    mutationFn: async ({ id, data }) => {
      if (token && navigator.onLine) {
        const { data: updatedData } = await API.patch<Goal>(
          `/api/goals/${id}`,
          data
        );
        return updatedData;
      } else {
        await updateLocalGoal(id, data).catch((error) => console.error(error));
        const oldGoal = queryClient
          .getQueryData<Goal[]>(queryKeyHandler)
          ?.find((g) => g.id === id);
        return { ...oldGoal, ...data } as Goal;
      }
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeyHandler });
      const previousGoals = queryClient.getQueryData<Goal[]>(queryKeyHandler);

      queryClient.setQueryData<Goal[]>(queryKeyHandler, (old = []) =>
        old.map((g) => (g.id === id ? { ...g, ...data } : g))
      );
      return { previousGoals };
    },
    onError: (error, _variables, context) => {
      if (context?.previousGoals) {
        queryClient.setQueryData(queryKeyHandler, context.previousGoals);
      }
      addNotification("error", t("goal_updated_error"));

      console.error(error);
    },
    onSuccess: () => {
      addNotification("success", t("goal_updated_success"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyHandler });
    },
  });
};

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { t } = useTranslation("query");
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const queryKeyHandler =
    token && navigator.onLine ? ["goals", "server"] : ["goals", "local"];

  return useMutation({
    mutationFn: async (id: string) => {
      if (token && navigator.onLine) {
        await API.delete(`/api/goals/${id}`);
      } else {
        await deleteLocalGoal(id).catch((error) => console.error(error));
      }
      return id;
    },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: queryKeyHandler });
      const previousGoals = queryClient.getQueryData<Goal[]>(queryKeyHandler);

      queryClient.setQueryData<Goal[]>(queryKeyHandler, (old = []) =>
        old.filter((g) => g.id !== deletedId)
      );

      return { previousGoals };
    },
    onError: (error, _variables, context) => {
      if (context?.previousGoals) {
        queryClient.setQueryData(queryKeyHandler, context.previousGoals);
      }
      addNotification("error", t("goal_delete_error"));
      console.error(error);
    },
    onSuccess: () => {
      addNotification("success", t("goal_delete_success"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyHandler });
    },
  });
};
