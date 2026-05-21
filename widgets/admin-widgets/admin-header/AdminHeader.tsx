"use client";

import { Bell, Search } from "lucide-react";
import { AdminLogoutButton } from "@/features/logout";
import styles from "./AdminHeader.module.scss";

export function AdminHeader() {

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
          <div>
            <strong>{"Администратор"}</strong>
          </div>
        </div>
        <AdminLogoutButton />
      </div>
    </header>
  );
}
