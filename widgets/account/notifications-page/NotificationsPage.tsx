"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  CheckCheck,
  CircleAlert,
  Inbox,
  RefreshCw,
} from "lucide-react";
import { NotificationCard, useNotifications } from "@/entities/notification";
import type { Notification } from "@/entities/notification";
import styles from "./NotificationsPage.module.scss";

type Filter = "all" | "unread" | "critical";

const filterItems: Array<{
  id: Filter;
  label: string;
  getCount: (notifications: Notification[]) => number;
}> = [
  {
    id: "all",
    label: "Все",
    getCount: (notifications) => notifications.length,
  },
  {
    id: "unread",
    label: "Непрочитанные",
    getCount: (notifications) =>
      notifications.filter((notification) => !notification.isRead).length,
  },
  {
    id: "critical",
    label: "Критичные",
    getCount: (notifications) =>
      notifications.filter((notification) => notification.severity === "critical").length,
  },
];

function getFilteredNotifications(notifications: Notification[], filter: Filter) {
  if (filter === "unread") {
    return notifications.filter((notification) => !notification.isRead);
  }

  if (filter === "critical") {
    return notifications.filter((notification) => notification.severity === "critical");
  }

  return notifications;
}

export function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
  } = useNotifications();

  const filteredNotifications = useMemo(
    () => getFilteredNotifications(notifications, activeFilter),
    [activeFilter, notifications],
  );
  const criticalCount = notifications.filter(
    (notification) => notification.severity === "critical",
  ).length;

  const handleRefresh = () => {
    void refreshNotifications();
  };

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className={styles.headerCopy}>
          <div className={styles.badge}>
            <Bell size={16} />
            <span>Центр уведомлений</span>
          </div>
          <h1>Все события по теплице</h1>
          <p>
            Здесь собраны новые детекции, предупреждения и системные сообщения.
          </p>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw size={18} />
            <span>{isLoading ? "Обновление" : "Обновить"}</span>
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck size={18} />
            <span>Прочитать все</span>
          </button>
        </div>
      </section>

      <section className={styles.summary} aria-label="Сводка уведомлений">
        <div className={styles.summaryItem}>
          <Inbox size={20} />
          <div>
            <span>Всего</span>
            <strong>{notifications.length}</strong>
          </div>
        </div>
        <div className={styles.summaryItem}>
          <Bell size={20} />
          <div>
            <span>Непрочитанные</span>
            <strong>{unreadCount}</strong>
          </div>
        </div>
        <div className={styles.summaryItem}>
          <CircleAlert size={20} />
          <div>
            <span>Критичные</span>
            <strong>{criticalCount}</strong>
          </div>
        </div>
      </section>

      <section className={styles.feed}>
        <div className={styles.toolbar}>
          <div className={styles.filters} aria-label="Фильтр уведомлений">
            {filterItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={activeFilter === item.id ? styles.activeFilter : ""}
                onClick={() => setActiveFilter(item.id)}
              >
                <span>{item.label}</span>
                <strong>{item.getCount(notifications)}</strong>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.list}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
              />
            ))
          ) : (
            <div className={styles.empty}>
              <Inbox size={32} />
              <strong>
                {isLoading ? "Загружаем уведомления" : "Уведомлений пока нет"}
              </strong>
              <p>
                Новые сообщения появятся здесь сразу после обработки данных.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
