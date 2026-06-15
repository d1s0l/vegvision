import { AlertTriangle } from "lucide-react";
import {
  formatNotificationDate,
  formatRelativeDate,
} from "@/shared/lib/date";
import {
  getAnalysisResult,
  translateDisease,
} from "../model/analysis-result";
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
  const analysis = getAnalysisResult(notification.payload);

  if (analysis.message) {
    return analysis.message;
  }

  if (notification.message) {
    return notification.message;
  }

  return `Обнаружено заболевание: ${translateDisease(notification.disease).toLowerCase()} в секторе ${notification.sector.replace("Сектор ", "")}`;
}

function formatConfidence(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function NotificationCard({
  notification,
  onMarkAsRead,
}: NotificationCardProps) {
  const analysis = getAnalysisResult(notification.payload);
  const disease = translateDisease(analysis.disease || notification.disease);
  const confidence = analysis.confidencePercent;
  const message = getNotificationMessage(notification);

  return (
    <article
      className={`${styles.card} ${!notification.isRead ? styles.unread : ""}`}
    >
      <div className={styles.icon} aria-hidden="true">
        <AlertTriangle size={18} />
      </div>

      <div className={styles.content}>
        <div className={styles.topLine}>
          <strong>Результат анализа</strong>
          <span>{severityLabel[notification.severity]}</span>
        </div>

        <div className={styles.resultGrid}>
          {analysis.imageUrl ? (
            <figure
              className={styles.imageBlock}
              role="link"
              tabIndex={0}
              onClick={() => window.open(analysis.imageUrl, "_blank", "noreferrer")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  window.open(analysis.imageUrl, "_blank", "noreferrer");
                }
              }}
            >
              <img src={analysis.imageUrl} alt="Исходное изображение растения" />
              <figcaption>Изображение</figcaption>
            </figure>
          ) : null}

          {false && analysis.visualizationUrl ? (
            <figure className={styles.imageBlock}>
              <img
                src={analysis.visualizationUrl}
                alt="Визуализация результата анализа"
              />
              <figcaption>Визуализация</figcaption>
            </figure>
          ) : null}
        </div>

        <dl className={styles.details}>
          <div>
            <dt>Диагноз</dt>
            <dd>{disease}</dd>
          </div>
          {confidence !== null ? (
            <div>
              <dt>Уверенность</dt>
              <dd>{confidence}%</dd>
            </div>
          ) : null}
        </dl>

        <p>{message}</p>

        {analysis.needsAgronomist ? (
          <div className={styles.agronomistWarning}>
            Требуется проверка агронома
          </div>
        ) : null}

        {analysis.top3.length > 0 ? (
          <div className={styles.topPredictions}>
            <strong>Возможные заболевания</strong>
            <ul>
              {analysis.top3.map((item) => (
                <li key={`${item.class}-${item.confidence}`}>
                  <span>{translateDisease(item.class)}</span>
                  <b>{formatConfidence(item.confidence)}</b>
                </li>
              ))}
            </ul>
          </div>
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
