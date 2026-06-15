export type NotificationSeverity = "info" | "warning" | "critical";

export type NotificationDeliveryStatus =
  | "pending"
  | "sent"
  | "failed"
  | "delivered"
  | "error"
  | string;

export interface NotificationPayload {
  sector?: string;
  disease?: string;
  severity?: NotificationSeverity;
  image_url?: string;
  raw_image_url?: string;
  visualization_path?: string;
  models?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  message: string;
  sector: string;
  disease: string;
  severity: NotificationSeverity;
  status: NotificationDeliveryStatus;
  type: string;
  notificationType: string;
  payload: NotificationPayload;
  createdAt: string;
  sentAt: string | null;
  readAt: string | null;
  isRead: boolean;
}

export interface BackendNotificationApiItem {
  user_id: string;
  title: string;
  body: string;
  read_at: string | null;
  event_id: string;
  type: string;
  message: string;
  status: NotificationDeliveryStatus;
  job_id: string;
  notification_type: string;
  payload: NotificationPayload;
  sent_at: string | null;
  delivery_error: string;
  id: string;
  created_at: string;
}

export interface NotificationToastItem extends Notification {
  toastId: string;
}
