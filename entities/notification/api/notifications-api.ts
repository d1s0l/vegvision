import type {
  BackendNotificationApiItem,
  Notification,
  NotificationPayload,
  NotificationSeverity,
} from "../model/types";

interface NotificationsResponse {
  notifications: BackendNotificationApiItem[];
}

type BackendNotificationsResponse =
  | BackendNotificationApiItem[]
  | NotificationsResponse;

const severityByStatus: Record<string, NotificationSeverity> = {
  pending: "warning",
  sent: "info",
  delivered: "info",
  failed: "critical",
  error: "critical",
};

function getStringPayloadValue(payload: NotificationPayload, key: string) {
  const value = payload[key];

  return typeof value === "string" ? value : "";
}

function resolveSeverity(notification: BackendNotificationApiItem) {
  if (notification.payload.severity) {
    return notification.payload.severity;
  }

  return severityByStatus[notification.status] ?? "warning";
}

function normalizeNotification(
  notification: BackendNotificationApiItem,
): Notification {
  const sector =
    getStringPayloadValue(notification.payload, "sector") || "Сектор не указан";
  const disease =
    getStringPayloadValue(notification.payload, "disease") ||
    notification.title ||
    notification.notification_type ||
    "Заболевание растения";

  return {
    id: notification.id,
    title: notification.title,
    body: notification.body,
    message: notification.message || notification.body || notification.title,
    sector,
    disease,
    severity: resolveSeverity(notification),
    status: notification.status,
    type: notification.type,
    notificationType: notification.notification_type,
    payload: notification.payload,
    createdAt: notification.created_at,
    sentAt: notification.sent_at,
    readAt: notification.read_at,
    isRead: Boolean(notification.read_at),
  };
}

function unwrapNotifications(data: BackendNotificationsResponse) {
  return Array.isArray(data) ? data : data.notifications;
}

export async function getNotifications(signal?: AbortSignal) {
  const response = await fetch("/api/notifications", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error("Не удалось загрузить уведомления");
  }

  const data = (await response.json()) as BackendNotificationsResponse;

  return unwrapNotifications(data).map(normalizeNotification);
}
