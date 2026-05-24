import type { User } from "@/entities/user";

interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

async function parseResponse<T>(response: Response) {
  const payload = (await response.json()) as T & { message?: string };

  if (!response.ok) {
    throw new Error(payload.message ?? "Request failed");
  }

  return payload;
}

export async function loginUser(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return parseResponse<AuthResponse>(response);
}

export async function restoreUserSession() {
  const response = await fetch("/api/auth/session", {
    method: "GET",
    cache: "no-store",
  });

  return parseResponse<AuthResponse>(response);
}

export async function refreshUserSession() {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
  });

  return parseResponse<AuthResponse>(response);
}

export async function logoutUser() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
}
