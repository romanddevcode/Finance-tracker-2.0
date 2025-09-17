import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../../../auth/AuthContext";
import type { SettingsLimit } from "../../types/settingsLimit";
import API from "../../../../../services/api/axios";
import { setBudgetLimitLocal } from "../../../../../services/budgetService";
import { useNotificationStore } from "@/services/store/notificationStore";
import { useTranslation } from "react-i18next";

export const useSetBudgetLimit = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { t } = useTranslation("query");

  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

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
      addNotification("error", t("budget_error"));
      console.error(error);
    },
    onSuccess: () => {
      addNotification("success", t("budget_add_success"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyHandler });
    },
  });
};

export default useSetBudgetLimit;
