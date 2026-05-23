import { AlertTriangle } from "lucide-react";
import {
  formatNotificationDate,
  formatRelativeDate,
} from "@/shared/lib/date";
import type { Notification } from "../model/types";
import styles from "./NotificationCard.module.scss";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
}

const severityLabel: Record<Notification["severity"], string> = {
  info: "Информация",
  warning: "Предупреждение",
  critical: "Критично",
};

export function getNotificationMessage(notification: Notification) {
  if (notification.message) {
    return notification.message;
  }

  return `Обнаружено заболевание: ${notification.disease.toLowerCase()} в секторе ${notification.sector.replace("Сектор ", "")}`;
}

export function NotificationCard({
  notification,
  onMarkAsRead,
}: NotificationCardProps) {
  return (
    <article
      className={`${styles.card} ${!notification.isRead ? styles.unread : ""}`}
    >
      <div className={styles.icon} aria-hidden="true">
        <AlertTriangle size={18} />
      </div>

      <div className={styles.content}>
        <div className={styles.topLine}>
          <strong>{notification.disease}</strong>
          <span>{severityLabel[notification.severity]}</span>
        </div>
        <p>{getNotificationMessage(notification)}</p>
        <div className={styles.meta}>
          <span>{notification.sector}</span>
          <time dateTime={notification.createdAt}>
            {formatRelativeDate(notification.createdAt)}
          </time>
        </div>
      </div>

      {!notification.isRead ? (
        <button
          type="button"
          className={styles.readButton}
          onClick={() => onMarkAsRead?.(notification.id)}
        >
          Отметить как прочитанное
        </button>
      ) : (
        <time className={styles.readTime} dateTime={notification.createdAt}>
          {formatNotificationDate(notification.createdAt)}
        </time>
      )}
    </article>
  );
}
