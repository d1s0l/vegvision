import { api, getApiErrorMessage, isRequestCanceled } from "@/shared/lib/api";
import type {
  BackendNotificationApiItem,
  Notification,
  NotificationPayload,
  NotificationSeverity,
} from "../model/types";
import { getAnalysisResult } from "../model/analysis-result";

interface NotificationsResponse {
  notifications: BackendNotificationApiItem[];
}

type BackendNotificationsResponse =
  | BackendNotificationApiItem[]
  | NotificationsResponse;

const DEFAULT_NOTIFICATION_TITLE = "Обнаружено заболевание";
const DEFAULT_NOTIFICATION_MESSAGE = "Обнаружено заболевание растения";

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

function isTechnicalText(value: string) {
  return value === "full" || value === "full_analysis";
}

function unwrapNotifications(data: BackendNotificationsResponse) {
  return Array.isArray(data) ? data : data.notifications;
}

function normalizeNotification(
  notification: BackendNotificationApiItem,
): Notification {
  const analysis = getAnalysisResult(notification.payload);
  const sector =
    getStringPayloadValue(notification.payload, "sector") || "Сектор не указан";
  const disease =
    getStringPayloadValue(notification.payload, "disease") ||
    analysis.disease ||
    DEFAULT_NOTIFICATION_TITLE;
  const messageCandidate =
    getStringPayloadValue(notification.payload, "message") ||
    analysis.message ||
    notification.message ||
    notification.body ||
    notification.title;
  const message =
    messageCandidate && !isTechnicalText(messageCandidate)
      ? messageCandidate
      : DEFAULT_NOTIFICATION_MESSAGE;

  return {
    id: notification.id,
    title: DEFAULT_NOTIFICATION_TITLE,
    body: notification.body,
    message,
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

export async function getNotifications(signal?: AbortSignal) {
  try {
    const response = await api.get<BackendNotificationsResponse>("/api/notifications", {
      signal,
    });

    return unwrapNotifications(response.data).map(normalizeNotification);
  } catch (error) {
    if (isRequestCanceled(error)) {
      throw error;
    }

    throw new Error(
      getApiErrorMessage(error, "Не удалось загрузить уведомления"),
    );
  }
}
