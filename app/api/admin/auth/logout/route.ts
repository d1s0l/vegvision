import { NextResponse } from "next/server";
import { ADMIN_REFRESH_COOKIE } from "@/shared/lib/admin-auth/constants";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_REFRESH_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    expires: new Date(0),
  });
  return response;
}
