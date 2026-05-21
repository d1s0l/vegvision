import { NextResponse } from "next/server";
import { adminPanelData } from "@/entities/admin";
import { ADMIN_REFRESH_COOKIE } from "@/shared/lib/admin-auth/constants";
import { createMockAccessToken } from "@/shared/lib/admin-auth/session";

export async function GET(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";

  if (!cookie.includes(ADMIN_REFRESH_COOKIE)) {
    return NextResponse.json({ message: "Сессия не найдена" }, { status: 401 });
  }

  return NextResponse.json({
    accessToken: createMockAccessToken(),
    admin: adminPanelData.currentAdmin,
  });
}
