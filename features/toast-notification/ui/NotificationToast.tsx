"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import {
  getAnalysisResult,
  getNotificationMessage,
  translateDisease,
  useNotifications,
  type NotificationToastItem,
} from "@/entities/notification";
import { formatRelativeDate } from "@/shared/lib/date";
import { ToastViewport } from "@/shared/ui/toast";
import styles from "./NotificationToast.module.scss";

const TOAST_CLOSE_DELAY = 6000;

const severityLabel: Record<NotificationToastItem["severity"], string> = {
  info: "Информация",
  warning: "Предупреждение",
  critical: "Критично",
};

interface ToastItemProps {
  toast: NotificationToastItem;
  onClose: (toastId: string) => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const analysis = getAnalysisResult(toast.payload);
  const disease = translateDisease(analysis.disease || toast.disease);

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => onClose(toast.toastId),
      TOAST_CLOSE_DELAY,
    );

    return () => window.clearTimeout(timeoutId);
  }, [onClose, toast.toastId]);

  return (
    <article className={styles.toast}>
      <div className={styles.icon} aria-hidden="true">
        <AlertTriangle size={18} />
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <strong>{disease}</strong>
          <span>{severityLabel[toast.severity]}</span>
        </div>
        <p>{getNotificationMessage(toast)}</p>
        <time dateTime={toast.createdAt}>{formatRelativeDate(toast.createdAt)}</time>
      </div>

      <button
        type="button"
        className={styles.closeButton}
        aria-label="Закрыть уведомление"
        onClick={() => onClose(toast.toastId)}
      >
        <X size={16} />
      </button>
    </article>
  );
}

export function NotificationToast() {
  const { visibleToasts, dismissToast } = useNotifications();

  return (
    <ToastViewport>
      {visibleToasts.map((toast) => (
        <ToastItem key={toast.toastId} toast={toast} onClose={dismissToast} />
      ))}
    </ToastViewport>
  );
}
