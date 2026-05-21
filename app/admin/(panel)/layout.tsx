import { redirect } from "next/navigation";
import { AdminAuthProvider } from "@/features/admin-auth";
import { getAdminSessionFromCookies } from "@/features/admin-auth/model/server-session";
import { ADMIN_LOGIN_PATH } from "@/shared/lib/admin-auth/constants";
import { AdminShell } from "@/widgets/admin-shell";

export default async function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getAdminSessionFromCookies();

  if (!session) {
    redirect(ADMIN_LOGIN_PATH);
  }

  return (
    <AdminAuthProvider initialAdmin={session.admin}>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
