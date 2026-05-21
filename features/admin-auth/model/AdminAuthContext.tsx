"use client";

import {
  createContext,
  startTransition,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AdminUser } from "@/entities/admin";
import {
  loginAdmin,
  logoutAdmin as logoutAdminRequest,
  refreshAdminSession,
  restoreAdminSession,
} from "../api/admin-auth";

interface AdminAuthContextValue {
  admin: AdminUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

export const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

interface AdminAuthProviderProps {
  children: ReactNode;
  initialAdmin?: AdminUser | null;
}

export function AdminAuthProvider({
  children,
  initialAdmin = null,
}: AdminAuthProviderProps) {
  const [admin, setAdmin] = useState<AdminUser | null>(initialAdmin);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(initialAdmin));
  const [error, setError] = useState<string | null>(null);

  const hydrateSession = async () => {
    setIsLoading(true);

    try {
      const response = await restoreAdminSession();
      startTransition(() => {
        setAdmin(response.admin);
        setAccessToken(response.accessToken);
        setError(null);
      });
    } catch (sessionError) {
      startTransition(() => {
        setAdmin(null);
        setAccessToken(null);
        setError(sessionError instanceof Error ? sessionError.message : "Не удалось восстановить сессию");
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialAdmin) {
      void hydrateSession();
    }
  }, [initialAdmin]);

  useEffect(() => {
    if (!admin) {
      return;
    }

    const refreshTimer = window.setInterval(() => {
      void refreshSession();
    }, 1000 * 60 * 10);

    return () => {
      window.clearInterval(refreshTimer);
    };
  }, [admin]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await loginAdmin(email, password);
      startTransition(() => {
        setAdmin(response.admin);
        setAccessToken(response.accessToken);
        setError(null);
      });
    } catch (loginError) {
      startTransition(() => {
        setError(loginError instanceof Error ? loginError.message : "Не удалось выполнить вход");
        setAdmin(null);
        setAccessToken(null);
      });
      throw loginError;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      await logoutAdminRequest();
    } finally {
      startTransition(() => {
        setAdmin(null);
        setAccessToken(null);
        setError(null);
      });
      setIsLoading(false);
    }
  };

  const refreshSession = async () => {
    try {
      const response = await refreshAdminSession();
      startTransition(() => {
        setAdmin(response.admin);
        setAccessToken(response.accessToken);
      });
    } catch {
      startTransition(() => {
        setAdmin(null);
        setAccessToken(null);
      });
    }
  };

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      admin,
      accessToken,
      isAuthenticated: Boolean(admin),
      isLoading,
      error,
      login,
      logout,
      refreshSession,
    }),
    [accessToken, admin, error, isLoading],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
