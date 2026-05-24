"use client";

import {
  createContext,
  startTransition,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/entities/user";
import {
  loginUser,
  logoutUser as logoutUserRequest,
  refreshUserSession,
  restoreUserSession,
} from "../api/user-auth";

interface UserAuthContextValue {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

export const UserAuthContext = createContext<UserAuthContextValue | null>(null);

interface UserAuthProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

export function UserAuthProvider({
  children,
  initialUser = null,
}: UserAuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(initialUser));
  const [error, setError] = useState<string | null>(null);

  const hydrateSession = async () => {
    setIsLoading(true);

    try {
      const response = await restoreUserSession();
      startTransition(() => {
        setUser(response.user);
        setAccessToken(response.accessToken);
        setError(null);
      });
    } catch (sessionError) {
      startTransition(() => {
        setUser(null);
        setAccessToken(null);
        setError(sessionError instanceof Error ? sessionError.message : "Session restore failed");
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialUser) {
      void hydrateSession();
    }
  }, [initialUser]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const refreshTimer = window.setInterval(() => {
      void refreshSession();
    }, 1000 * 60 * 10);

    return () => {
      window.clearInterval(refreshTimer);
    };
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await loginUser(email, password);
      startTransition(() => {
        setUser(response.user);
        setAccessToken(response.accessToken);
        setError(null);
      });
    } catch (loginError) {
      startTransition(() => {
        setError(loginError instanceof Error ? loginError.message : "Login failed");
        setUser(null);
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
      await logoutUserRequest();
    } finally {
      startTransition(() => {
        setUser(null);
        setAccessToken(null);
        setError(null);
      });
      setIsLoading(false);
    }
  };

  const refreshSession = async () => {
    try {
      const response = await refreshUserSession();
      startTransition(() => {
        setUser(response.user);
        setAccessToken(response.accessToken);
      });
    } catch {
      startTransition(() => {
        setUser(null);
        setAccessToken(null);
      });
    }
  };

  const value = useMemo<UserAuthContextValue>(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user),
      isLoading,
      error,
      login,
      logout,
      refreshSession,
    }),
    [accessToken, error, isLoading, user],
  );

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
}
