import { NextResponse } from "next/server";
import { ADMIN_REFRESH_COOKIE } from "@/shared/lib/admin-auth/constants";

function isSecureRequest(request: Request) {
  const forwardedProto = request.headers.get("x-forwarded-proto");

  return forwardedProto
    ? forwardedProto.includes("https")
    : new URL(request.url).protocol === "https:";
}

export async function POST(request: Request) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_REFRESH_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: isSecureRequest(request),
    path: "/",
    expires: new Date(0),
  });
  return response;
}
