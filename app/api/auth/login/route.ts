import { NextResponse } from "next/server";
import { mockCurrentUser, mockUserCredentials } from "@/entities/user";
import { USER_REFRESH_COOKIE } from "@/shared/lib/user-auth/constants";
import { createMockUserAccessToken } from "@/shared/lib/user-auth/session";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };

  if (
    body.email !== mockUserCredentials.email ||
    body.password !== mockUserCredentials.password
  ) {
    return NextResponse.json({ message: "Invalid login or password" }, { status: 401 });
  }

  const response = NextResponse.json({
    accessToken: createMockUserAccessToken(),
    refreshToken: "set-via-http-only-cookie",
    user: mockCurrentUser,
  });

  response.cookies.set(USER_REFRESH_COOKIE, "vegvision-user-refresh", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
