"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ADMIN_LOGIN_PATH } from "@/shared/lib/admin-auth/constants";
import { useAdminAuth } from "@/features/admin-auth";
import styles from "./AdminLogoutButton.module.scss";

export function AdminLogoutButton() {
  const router = useRouter();
  const { logout, isLoading } = useAdminAuth();

  const handleClick = async () => {
    await logout();
    router.push(ADMIN_LOGIN_PATH);
    router.refresh();
  };

  return (
    <button type="button" className={styles.button} onClick={handleClick} disabled={isLoading}>
      <LogOut size={16} />
      Выйти
    </button>
  );
}
