import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";
import { AuthProvider } from "../auth/AuthContext";
import { afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

export const testQueryClient = new QueryClient();

export function renderWithProviders(
  ui: ReactNode,
  options: { withAuth?: boolean } = {}
) {
  afterEach(() => {
    testQueryClient.clear();
  });

  return render(
    <QueryClientProvider client={testQueryClient}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          {options.withAuth === false ? ui : <AuthProvider>{ui}</AuthProvider>}
        </MemoryRouter>
      </I18nextProvider>
    </QueryClientProvider>
  );
}
