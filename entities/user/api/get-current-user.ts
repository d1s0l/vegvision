import { api, getApiErrorMessage } from "@/shared/lib/api";
import type { User } from "../model/types";

interface BackendUser {
  id?: string;
  email?: string;
  role?: string;
}

function mapBackendUser(user: BackendUser): User {
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

export async function getCurrentUser() {
  try {
    const response = await api.get<BackendUser>("/api/user");

    return mapBackendUser(response.data);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Ошибка запроса"));
  }
}
