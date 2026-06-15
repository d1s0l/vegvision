import { type NextRequest, NextResponse } from "next/server";
import {
  backendJson,
  getBearerHeaders,
  isBackendConfigured,
  mapBackendUser,
  type BackendUser,
} from "@/shared/lib/backend-api";
import { ADMIN_REFRESH_COOKIE } from "@/shared/lib/admin-auth/constants";

type CreateUserPayload = {
  email?: unknown;
  password?: unknown;
  phone?: unknown;
};

const getTextValue = (value: unknown) => (typeof value === "string" ? value.trim() : "");

function getBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.toLowerCase().startsWith("bearer ")) {
    return "";
  }

  return authorization.slice("bearer ".length).trim();
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as CreateUserPayload;
  const email = getTextValue(payload.email).toLowerCase();
  const password = getTextValue(payload.password);
  const phone = getTextValue(payload.phone);
  const adminAccessToken =
    getBearerToken(request) || request.cookies.get(ADMIN_REFRESH_COOKIE)?.value;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 },
    );
  }

  if (!adminAccessToken) {
    return NextResponse.json(
      { message: "Admin token is required to create users" },
      { status: 401 },
    );
  }

  if (!isBackendConfigured()) {
    return NextResponse.json({
      email,
      fullName: email.split("@")[0],
      name: email.split("@")[0],
      role: "user",
      username: email.split("@")[0],
    });
  }

  try {
    const user = await backendJson<BackendUser>("/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getBearerHeaders(adminAccessToken),
      },
      body: JSON.stringify({
        email,
        role: "user",
        phone,
        is_active: true,
        password,
      }),
    });

    return NextResponse.json(mapBackendUser(user));
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Registration failed" },
      { status: 400 },
    );
  }
}
