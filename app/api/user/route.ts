import { NextResponse, type NextRequest } from "next/server";
import { mockCurrentUser } from "@/entities/user";
import {
  type BackendUser,
  backendJson,
  getBearerHeaders,
  isBackendConfigured,
  mapBackendUser,
} from "@/shared/lib/backend-api";

function getBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.toLowerCase().startsWith("bearer ")) {
    return "";
  }

  return authorization.slice("bearer ".length).trim();
}

export async function GET(request: NextRequest) {
  if (!isBackendConfigured()) {
    return NextResponse.json(mockCurrentUser);
  }

  const accessToken = getBearerToken(request);

  if (!accessToken) {
    return NextResponse.json({ message: "Session not found" }, { status: 401 });
  }

  try {
    const backendUser = await backendJson<BackendUser>("/auth/me", {
      headers: getBearerHeaders(accessToken),
    });

    return NextResponse.json(mapBackendUser(backendUser));
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "User request failed" },
      { status: 401 },
    );
  }
}
