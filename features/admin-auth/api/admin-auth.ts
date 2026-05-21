import type { AdminUser } from "@/entities/admin";

interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  admin: AdminUser;
}

async function parseResponse<T>(response: Response) {
  const payload = (await response.json()) as T & { message?: string };

  if (!response.ok) {
    throw new Error(payload.message ?? "Request failed");
  }

  return payload;
}

export async function loginAdmin(email: string, password: string) {
  const response = await fetch("/api/admin/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return parseResponse<AuthResponse>(response);
}

export async function restoreAdminSession() {
  const response = await fetch("/api/admin/auth/session", {
    method: "GET",
    cache: "no-store",
  });

  return parseResponse<AuthResponse>(response);
}

export async function refreshAdminSession() {
  const response = await fetch("/api/admin/auth/refresh", {
    method: "POST",
  });

  return parseResponse<AuthResponse>(response);
}

export async function logoutAdmin() {
  const response = await fetch("/api/admin/auth/logout", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
}
