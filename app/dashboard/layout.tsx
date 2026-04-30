import type { ReactNode } from "react";
import { Sidebar } from "@/widgets/account/sidebar";
import styles from "./DashboardLayout.module.scss";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
