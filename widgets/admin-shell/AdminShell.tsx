import type { ReactNode } from "react";
import { adminShellStyles } from "@/shared/ui/admin-shell";
import { AdminHeader } from "@/widgets/admin-header";
import { AdminSidebar } from "@/widgets/admin-sidebar";

interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className={adminShellStyles.layout}>
      <AdminSidebar />
      <div className={adminShellStyles.contentArea}>
        <AdminHeader />
        <main className={adminShellStyles.content}>{children}</main>
      </div>
    </div>
  );
}
