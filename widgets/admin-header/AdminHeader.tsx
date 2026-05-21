"use client";

import Image from "next/image";
import { Bell, Search } from "lucide-react";
import { useAdminAuth } from "@/features/admin-auth";
import { AdminLogoutButton } from "@/features/logout";
import styles from "./AdminHeader.module.scss";

export function AdminHeader() {
  const { admin } = useAdminAuth();

  return (
    <header className={styles.header}>
      <div className={styles.searchShell}>
        <Search size={16} />
        <input type="search" placeholder="Поиск по клиентам, инцидентам и логам..." />
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.iconButton} aria-label="Уведомления">
          <Bell size={18} />
        </button>
        <div className={styles.profile}>
          <Image src={admin?.avatar ?? "/tomato-leaf.png"} alt={admin?.name ?? "Администратор"} width={42} height={42} />
          <div>
            <strong>{admin?.name ?? "Администратор"}</strong>
            <span>{admin?.role ?? "owner"}</span>
          </div>
        </div>
        <AdminLogoutButton />
      </div>
    </header>
  );
}
