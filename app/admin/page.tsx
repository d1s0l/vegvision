import { redirect } from "next/navigation";
import { getAdminSessionFromCookies } from "@/features/admin-auth/model/server-session";
import { ADMIN_DASHBOARD_PATH, ADMIN_LOGIN_PATH } from "@/shared/lib/admin-auth/constants";

export default async function AdminRootPage() {
  const session = await getAdminSessionFromCookies();
  redirect(session ? ADMIN_DASHBOARD_PATH : ADMIN_LOGIN_PATH);
}
