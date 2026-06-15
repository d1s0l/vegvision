import type { User } from "@/entities/user";
import {
  api,
  clearAccessToken,
  getAccessToken,
  getApiErrorMessage,
  setAccessToken,
} from "@/shared/lib/api";

interface AuthResponse {
  accessToken: string;
  user: User;
}

interface BackendLoginResponse {
  access_token: string;
  token_type: string;
}

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

export async function loginUser(email: string, password: string) {
  try {
    const loginResponse = await api.post<AuthResponse & BackendLoginResponse>("/api/auth/login", {
      email,
      password,
    });
    const accessToken = loginResponse.data.accessToken ?? loginResponse.data.access_token;

    if (!accessToken) {
      throw new Error("Backend login response does not contain access_token");
    }

    setAccessToken(accessToken);

    if (loginResponse.data.user) {
      return {
        accessToken,
        user: loginResponse.data.user,
      } satisfies AuthResponse;
    }

    const userResponse = await api.get<BackendUser>("/api/user");

    return {
      accessToken,
      user: mapBackendUser(userResponse.data),
    } satisfies AuthResponse;
  } catch (error) {
    clearAccessToken();
    throw new Error(getApiErrorMessage(error, "Login failed"));
  }
}

export async function restoreUserSession() {
  const accessToken = getAccessToken();

  try {
    const userResponse = await api.get<BackendUser>("/api/user");

    return {
      accessToken: accessToken ?? "",
      user: mapBackendUser(userResponse.data),
    } satisfies AuthResponse;
  } catch (error) {
    clearAccessToken();
    throw new Error(getApiErrorMessage(error, "Session restore failed"));
  }
}

export async function logoutUser() {
  clearAccessToken();
}
