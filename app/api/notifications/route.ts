import { type NextRequest, NextResponse } from "next/server";
import type { BackendNotificationApiItem } from "@/entities/notification";
import {
  backendJson,
  getBearerHeaders,
  isBackendConfigured,
} from "@/shared/lib/backend-api";

export const dynamic = "force-dynamic";

function getBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.toLowerCase().startsWith("bearer ")) {
    return "";
  }

  return authorization.slice("bearer ".length).trim();
}

export async function GET(request: NextRequest) {
  if (!isBackendConfigured()) {
    return NextResponse.json(
      { message: "Backend API is not configured" },
      { status: 503 },
    );
  }

  const accessToken = getBearerToken(request);

  if (!accessToken) {
    return NextResponse.json({ message: "Access token is required" }, { status: 401 });
  }

  try {
    const notifications = await backendJson<BackendNotificationApiItem[]>(
      "/notifications/my",
      {
        headers: getBearerHeaders(accessToken),
      },
    );

    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Notifications request failed",
      },
      { status: 500 },
    );
  }
}
