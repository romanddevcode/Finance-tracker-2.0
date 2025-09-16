// src/features/auth/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api/axios";
import type { AuthContextValue } from "../types/authContextValue";
import type { Props } from "../types/props";
import { useQueryClient } from "@tanstack/react-query";

const AuthCtx = createContext<AuthContextValue>(null!);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (accessToken) {
      API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      delete API.defaults.headers.common.Authorization;
    }
  }, [accessToken]);

  const register = async (email: string, pass: string) => {
    const { data } = await API.post("/api/register", { email, password: pass });

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
  };

  const login = async (email: string, pass: string) => {
    const { data } = await API.post("/api/login", { email, password: pass });

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
  };

  const logout = () => {
    queryClient.clear();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
  };

  const refresh = async () => {
    if (!refreshToken) {
      logout();
      return null;
    }
    try {
      const { data } = await API.post("/api/refresh", { refreshToken });
      localStorage.setItem("accessToken", data.accessToken);
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (err) {
      console.error("Refresh error", err);
      logout();
      return null;
    }
  };

  return (
    <AuthCtx.Provider
      value={{
        token: accessToken, // для обратной совместимости
        login,
        logout,
        register,
        refresh,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => useContext(AuthCtx);
