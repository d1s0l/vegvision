import { NextResponse } from "next/server";
import { adminPanelData, mockAdminCredentials } from "@/entities/admin";
import { ADMIN_REFRESH_COOKIE } from "@/shared/lib/admin-auth/constants";
import { createMockAccessToken } from "@/shared/lib/admin-auth/session";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };

  if (
    body.email !== mockAdminCredentials.email ||
    body.password !== mockAdminCredentials.password
  ) {
    return NextResponse.json(
      { message: "Неверные данные администратора" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({
    accessToken: createMockAccessToken(),
    refreshToken: "set-via-http-only-cookie",
    admin: adminPanelData.currentAdmin,
  });

  response.cookies.set(ADMIN_REFRESH_COOKIE, "vegvision-admin-refresh", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
