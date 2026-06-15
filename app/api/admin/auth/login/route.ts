import { NextResponse } from "next/server";
import {
  type BackendUser,
  backendJson,
  getBearerHeaders,
  isBackendConfigured,
  mapBackendAdmin,
  mapBackendLoginResponse,
} from "@/shared/lib/backend-api";
import { ADMIN_REFRESH_COOKIE } from "@/shared/lib/admin-auth/constants";

function isSecureRequest(request: Request) {
  const forwardedProto = request.headers.get("x-forwarded-proto");

  return forwardedProto
    ? forwardedProto.includes("https")
    : new URL(request.url).protocol === "https:";
}

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const secureCookie = isSecureRequest(request);

  if (!isBackendConfigured()) {
    return NextResponse.json(
      { message: "Backend API is not configured" },
      { status: 503 },
    );
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
    const response = NextResponse.json({
      accessToken,
      refreshToken: "set-via-http-only-cookie",
      admin: mapBackendAdmin(backendUser),
    });

    response.cookies.set(ADMIN_REFRESH_COOKIE, accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: secureCookie,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Admin login failed" },
      { status: 401 },
    );
  }
}
