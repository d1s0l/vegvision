import { NextResponse } from "next/server";
import { mockCurrentUser, mockUserCredentials } from "@/entities/user";
import {
  type BackendUser,
  backendJson,
  getBearerHeaders,
  isBackendConfigured,
  mapBackendLoginResponse,
  mapBackendUser,
} from "@/shared/lib/backend-api";
import { createMockUserAccessToken } from "@/shared/lib/user-auth/session";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };

  if (!isBackendConfigured()) {
    if (
      body.email !== mockUserCredentials.email ||
      body.password !== mockUserCredentials.password
    ) {
      return NextResponse.json({ message: "Invalid login or password" }, { status: 401 });
    }

    return NextResponse.json({
      accessToken: createMockUserAccessToken(),
      user: mockCurrentUser,
    });
  }

  try {
    const loginPayload = await backendJson<{ access_token: string; token_type: string }>(
      "/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: body.email,
          password: body.password,
        }),
      },
    );
    const { accessToken } = mapBackendLoginResponse(loginPayload);
    const backendUser = await backendJson<BackendUser>("/auth/me", {
      headers: getBearerHeaders(accessToken),
    });
    const user = mapBackendUser(backendUser);
    return NextResponse.json({
      accessToken,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Login failed" },
      { status: 401 },
    );
  }
}
