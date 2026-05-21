import { cookies } from "next/headers";
import { adminPanelData } from "@/entities/admin";
import { ADMIN_REFRESH_COOKIE } from "@/shared/lib/admin-auth/constants";

export async function getAdminSessionFromCookies() {
  const cookieStore = await cookies();
  const refresh = cookieStore.get(ADMIN_REFRESH_COOKIE)?.value;

  if (!refresh) {
    return null;
  }

  return {
    admin: adminPanelData.currentAdmin,
  };
}
