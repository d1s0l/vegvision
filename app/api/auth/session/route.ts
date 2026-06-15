import { NextResponse, type NextRequest } from "next/server";
import { mockCurrentUser } from "@/entities/user";
import {
  type BackendUser,
  backendJson,
  getBearerHeaders,
  isBackendConfigured,
  mapBackendUser,
} from "@/shared/lib/backend-api";
import { USER_REFRESH_COOKIE } from "@/shared/lib/user-auth/constants";
import { createMockUserAccessToken } from "@/shared/lib/user-auth/session";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(USER_REFRESH_COOKIE)?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "Session not found" }, { status: 401 });
  }

  if (!isBackendConfigured()) {
    return NextResponse.json({
      accessToken: createMockUserAccessToken(),
      user: mockCurrentUser,
    });
  }

  try {
    const backendUser = await backendJson<BackendUser>("/auth/me", {
      headers: getBearerHeaders(accessToken),
    });

    return NextResponse.json({
      accessToken,
      user: mapBackendUser(backendUser),
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Session restore failed" },
      { status: 401 },
    );
  }
}
