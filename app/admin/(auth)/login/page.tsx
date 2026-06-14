import type { Metadata } from "next";
import { AdminAuthProvider, AdminLoginForm } from "@/features/admin-auth";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Вход администратора",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <div className={styles.page}>
      <AdminAuthProvider>
        <AdminLoginForm />
      </AdminAuthProvider>
    </div>
  );
}
