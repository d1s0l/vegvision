"use client";

import Image from "next/image";
import { Bell, Sparkles } from "lucide-react";
import { useCurrentUser } from "@/entities/user";
import styles from "./Header.module.scss";

export function DashboardHeader() {
  const { user, isLoading } = useCurrentUser();
  const userName = isLoading ? "..." : user?.name ?? "Агроном";

  return (
    <header className={styles.header}>
      <div className={styles.copy}>
        <div className={styles.badge}>
          <Sparkles size={16} />
          <span>AI-мониторинг теплиц в реальном времени</span>
        </div>
        <div>
          <h1>Здравствуйте, {userName}</h1>
          <p>
            Панель показывает уже обработанную ML-аналитику по состоянию
            растений, камерам и условиям в теплицах.
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.notificationButton}
          aria-label="Открыть уведомления"
        >
          <Bell size={20} />
          <span className={styles.notificationDot}>3</span>
        </button>

        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Image
              src="/tomato-leaf.png"
              alt="Аватар пользователя"
              width={56}
              height={56}
            />
          </div>
          <div className={styles.profileMeta}>
            <strong>{user?.name ?? "Алексей"}</strong>
            <span>Главный агроном</span>
          </div>
        </div>
      </div>
    </header>
  );
}
