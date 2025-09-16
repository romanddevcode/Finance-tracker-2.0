import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthContext";
import type { SettingsLimit } from "../types/settingsLimit";
import API from "../services/api/axios";
import { setBudgetLimitLocal } from "../services/budgetService";

export const useSetBudgetLimit = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const queryKeyHandler =
    token && navigator.onLine
      ? ["budgetLimit", "server"]
      : ["budgetLimit", "local"];

  return useMutation({
    mutationFn: async (settings: SettingsLimit) => {
      if (token && navigator.onLine) {
        const { data: updatedSettings } = await API.put<SettingsLimit>(
          `/api/budgetsettings/`,
          settings
        );
        return updatedSettings;
      } else {
        await setBudgetLimitLocal(
          settings.value,
          settings.isActivated,
          settings.currency
        ).catch((error) => console.error(error));
      }
      return settings;
    },
    onMutate: async (newSettings) => {
      await queryClient.cancelQueries({ queryKey: queryKeyHandler });
      const previousSettings =
        queryClient.getQueryData<SettingsLimit>(queryKeyHandler);

      queryClient.setQueryData<SettingsLimit>(
        queryKeyHandler,
        () => newSettings
      );

      return { previousSettings };
    },
    onError: (error, _newSettings, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData<SettingsLimit>(
          queryKeyHandler,
          context.previousSettings
        );
      }
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyHandler });
    },
  });
};

export default useSetBudgetLimit;
