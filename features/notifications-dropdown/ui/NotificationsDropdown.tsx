"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Bell, ExternalLink } from "lucide-react";
import { NotificationCard, useNotifications } from "@/entities/notification";
import { DropdownPanel } from "@/shared/ui/dropdown";
import styles from "./NotificationsDropdown.module.scss";

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const params = useParams<{ username?: string }>();
  const username = typeof params.username === "string" ? params.username : "";
  const notificationsHref = username ? `/u/${username}/notifications` : "/";
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.notificationButton}
        aria-label="Открыть уведомления"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <Bell size={20} />
        {unreadCount > 0 ? (
          <span className={styles.notificationDot}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>

      <DropdownPanel isOpen={isOpen}>
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <div>
              <span>Новые уведомления</span>
              <strong>{unreadCount} непрочитанных</strong>
            </div>

            <button
              type="button"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Отметить как прочитанное
            </button>
          </div>

          <div className={styles.list}>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  compact
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))
            ) : (
              <div className={styles.empty}>
                {isLoading ? "Загрузка уведомлений..." : "Нет новых уведомлений"}
              </div>
            )}
          </div>

          <Link
            className={styles.footer}
            href={notificationsHref}
            onClick={() => setIsOpen(false)}
          >
            <span>Все уведомления</span>
            <ExternalLink size={16} />
          </Link>
        </div>
      </DropdownPanel>
    </div>
  );
}
