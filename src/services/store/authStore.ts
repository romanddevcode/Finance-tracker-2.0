// src/features/auth/useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (access: string, refresh: string) => void;
  clearTokens: () => void;
  refresh: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  setTokens: (access, refresh) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    set({ accessToken: access, refreshToken: refresh });
  },
  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ accessToken: null, refreshToken: null });
  },
  refresh: async () => {
    const { refreshToken } = get();
    if (!refreshToken) return null;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to refresh token");
      get().setTokens(data.accessToken, data.refreshToken || refreshToken);
      return data.accessToken;
    } catch (err) {
      get().clearTokens();
      return null;
    }
  },
}));
