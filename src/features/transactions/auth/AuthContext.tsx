// src/features/auth/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api/axios";
import { syncTransactions } from "../services/syncServices";
import type { AuthContextValue } from "../types/AuthContextValue";
import type { Props } from "../types/Props";

const AuthCtx = createContext<AuthContextValue>(null!);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // При появлении токена — синхронизируем старые данные ПОКА ЧТО В ДОРАБОТКЕ
  useEffect(() => {
    if (token) {
      API.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common.Authorization;
      localStorage.removeItem("token");
    }
  }, [token]);

  const register = async (email: string, pass: string) => {
    const { data } = await API.post("/api/register", { email, password: pass });
    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  const login = async (email: string, pass: string) => {
    const { data } = await API.post("/api/login", { email, password: pass });
    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthCtx.Provider value={{ token, login, logout, register }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => useContext(AuthCtx);
