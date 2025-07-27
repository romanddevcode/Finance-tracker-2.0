import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";
import { AuthProvider } from "../auth/AuthContext";
import { afterEach } from "vitest";

export function renderWithProviders(
  ui: ReactNode,
  options: { withAuth?: boolean } = {}
) {
  const queryClient = new QueryClient();

  afterEach(() => {
    queryClient.clear();
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        {options.withAuth === false ? ui : <AuthProvider>{ui}</AuthProvider>}
      </I18nextProvider>
    </QueryClientProvider>
  );
}
