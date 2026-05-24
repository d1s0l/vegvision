import { NextResponse } from "next/server";
import { mockCurrentUser } from "@/entities/user";
import { USER_REFRESH_COOKIE } from "@/shared/lib/user-auth/constants";
import { createMockUserAccessToken } from "@/shared/lib/user-auth/session";

export async function GET(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";

  if (!cookie.includes(USER_REFRESH_COOKIE)) {
    return NextResponse.json({ message: "Session not found" }, { status: 401 });
  }

  return NextResponse.json({
    accessToken: createMockUserAccessToken(),
    user: mockCurrentUser,
  });
}
