import type { AdminRole, AdminUser, InternalUserRow } from "@/entities/admin";
import type { User } from "@/entities/user";

export type BackendUser = {
  id?: string;
  email?: string;
  role?: string;
  phone?: string;
  is_active?: boolean;
  created_at?: string;
};

type BackendLoginResponse = {
  access_token?: string;
  token_type?: string;
};

const ADMIN_ROLES: AdminRole[] = ["owner", "support", "ops", "ml-admin"];

export function getBackendUrl() {
  return (
    process.env.BACKEND_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    ""
  ).replace(/\/+$/, "");
}

export function isBackendConfigured() {
  return Boolean(getBackendUrl());
}

export function getBackendEndpoint(path: string) {
  const backendUrl = getBackendUrl();

  if (!backendUrl) {
    throw new Error("BACKEND_URL is not configured");
  }

  return `${backendUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function readBackendError(response: Response) {
  try {
    const payload = (await response.json()) as {
      detail?: unknown;
      message?: unknown;
      error?: unknown;
    };

    if (typeof payload.message === "string") {
      return payload.message;
    }

    if (typeof payload.error === "string") {
      return payload.error;
    }

    if (typeof payload.detail === "string") {
      return payload.detail;
    }

    if (payload.detail) {
      return JSON.stringify(payload.detail);
    }
  } catch {
    // The backend may return an empty body or non-JSON error page.
  }

  return "Backend request failed";
}

export async function backendFetch(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  return fetch(getBackendEndpoint(path), {
    ...init,
    headers,
    cache: "no-store",
  });
}

export async function backendJson<T>(path: string, init: RequestInit = {}) {
  const response = await backendFetch(path, init);

  if (!response.ok) {
    throw new Error(await readBackendError(response));
  }

  return response.json() as Promise<T>;
}

export function getBearerHeaders(accessToken: string) {
  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

export function mapBackendLoginResponse(payload: BackendLoginResponse) {
  if (!payload.access_token) {
    throw new Error("Backend login response does not contain access_token");
  }

  return {
    accessToken: payload.access_token,
    tokenType: payload.token_type ?? "bearer",
  };
}

export function mapBackendUser(user: BackendUser): User {
  const email = user.email ?? "";
  const fallbackName = email ? email.split("@")[0] : "user";

  return {
    email,
    fullName: fallbackName,
    name: fallbackName,
    role: user.role ?? "user",
    username: fallbackName,
  };
}

export function mapBackendAdmin(user: BackendUser): AdminUser {
  const rawRole = user.role ?? "support";
  const role = ADMIN_ROLES.includes(rawRole as AdminRole)
    ? (rawRole as AdminRole)
    : "support";

  return {
    id: user.id ?? user.email ?? "admin",
    email: user.email ?? "",
    role,
    lastLogin: user.created_at ?? "Current session",
  };
}

export function mapBackendAdminUserRow(user: BackendUser): InternalUserRow {
  const rawRole = user.role ?? "support";
  const role = ADMIN_ROLES.includes(rawRole as AdminRole)
    ? (rawRole as AdminRole)
    : "support";

  return {
    id: user.id ?? user.email ?? crypto.randomUUID(),
    name: user.email ?? "Unknown user",
    role,
    permissions: user.role ?? "user",
    session: user.is_active ? "Active" : "Inactive",
    activity: user.created_at ? `Created at ${user.created_at}` : "No activity data",
  };
}
