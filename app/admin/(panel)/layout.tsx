import { adminPanelData } from "@/entities/admin";
import { AdminAuthProvider } from "@/features/admin-auth";
import { AdminShell } from "@/widgets/admin-widgets/admin-shell";

export const revalidate = 60;

export default function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminAuthProvider initialAdmin={adminPanelData.currentAdmin}>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
