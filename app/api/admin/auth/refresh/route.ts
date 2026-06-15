import { NextResponse, type NextRequest } from "next/server";
import {
  type BackendUser,
  backendJson,
  getBearerHeaders,
  isBackendConfigured,
  mapBackendAdmin,
} from "@/shared/lib/backend-api";
import { ADMIN_REFRESH_COOKIE } from "@/shared/lib/admin-auth/constants";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(ADMIN_REFRESH_COOKIE)?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "Session cookie not found" }, { status: 401 });
  }

  if (!isBackendConfigured()) {
    return NextResponse.json(
      { message: "Backend API is not configured" },
      { status: 503 },
    );
  }

  try {
    const backendUser = await backendJson<BackendUser>("/auth/me", {
      headers: getBearerHeaders(accessToken),
    });

    return NextResponse.json({
      accessToken,
      admin: mapBackendAdmin(backendUser),
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Admin refresh failed" },
      { status: 401 },
    );
  }
}
