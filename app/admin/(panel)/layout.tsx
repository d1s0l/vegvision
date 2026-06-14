import { adminPanelData } from "@/entities/admin";
import { AdminAuthProvider } from "@/features/admin-auth";
import { privatePageMetadata } from "@/shared/lib/seo";
import { AdminShell } from "@/widgets/admin-widgets/admin-shell";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const metadata = privatePageMetadata;

export default function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminAuthProvider initialAdmin={adminPanelData.currentAdmin}>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
