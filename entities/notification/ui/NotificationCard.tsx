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

function getImageUrl(notification: Notification) {
  const value = notification.payload.image_url;

  return typeof value === "string" ? value : "";
}

function formatImageUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const fileName = parsedUrl.pathname.split("/").filter(Boolean).at(-1) ?? "";
    const shortFileName =
      fileName.length > 28 ? `${fileName.slice(0, 18)}...${fileName.slice(-7)}` : fileName;

    return `${parsedUrl.hostname}/.../${shortFileName}`;
  } catch {
    return url.length > 48 ? `${url.slice(0, 32)}...${url.slice(-12)}` : url;
  }
}

export function NotificationCard({
  notification,
  onMarkAsRead,
}: NotificationCardProps) {
  const imageUrl = getImageUrl(notification);

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
        {imageUrl ? (
          <a
            className={styles.imageLink}
            href={imageUrl}
            target="_blank"
            rel="noreferrer"
            title={imageUrl}
          >
            {formatImageUrl(imageUrl)}
          </a>
        ) : null}
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
