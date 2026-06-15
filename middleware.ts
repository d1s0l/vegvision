import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_LOGIN_PATH,
  ADMIN_REFRESH_COOKIE,
} from "@/shared/lib/admin-auth/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAdminRefresh = Boolean(request.cookies.get(ADMIN_REFRESH_COOKIE)?.value);

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!hasAdminRefresh) {
      return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
    }
  }

  if (pathname === ADMIN_LOGIN_PATH && hasAdminRefresh) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
