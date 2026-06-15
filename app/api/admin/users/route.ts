import { NextResponse, type NextRequest } from "next/server";
import { adminPanelData } from "@/entities/admin";
import {
  type BackendUser,
  backendJson,
  getBearerHeaders,
  isBackendConfigured,
  mapBackendAdminUserRow,
} from "@/shared/lib/backend-api";
import { ADMIN_REFRESH_COOKIE } from "@/shared/lib/admin-auth/constants";

export async function GET(request: NextRequest) {
  if (!isBackendConfigured()) {
    return NextResponse.json(adminPanelData.internalUsers);
  }

  const accessToken = request.cookies.get(ADMIN_REFRESH_COOKIE)?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "Admin session not found" }, { status: 401 });
  }

  try {
    const backendUsers = await backendJson<BackendUser[]>("/admin/users", {
      headers: getBearerHeaders(accessToken),
    });

    return NextResponse.json(backendUsers.map(mapBackendAdminUserRow));
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Admin users request failed" },
      { status: 500 },
    );
  }
}
