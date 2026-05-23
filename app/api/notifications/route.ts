import { NextResponse } from "next/server";
import type { BackendNotificationApiItem } from "@/entities/notification";

export const dynamic = "force-dynamic";

function minutesAgo(minutes: number) {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString();
}

function buildNotification(
  notification: Omit<
    BackendNotificationApiItem,
    | "user_id"
    | "event_id"
    | "job_id"
    | "sent_at"
    | "delivery_error"
    | "created_at"
    | "read_at"
  > & {
    created_at: string;
    read_at?: string | null;
    sent_at?: string | null;
  },
): BackendNotificationApiItem {
  return {
    user_id: "8f6807a0-d5a5-42dd-a781-99f9fc7f31f1",
    event_id: "6a09d2b9-09c8-4df0-9055-99b1df0c04d0",
    job_id: "3ec398f2-466b-4b06-b8af-28c9a2c018c6",
    delivery_error: "",
    read_at: notification.read_at ?? null,
    sent_at: notification.sent_at ?? notification.created_at,
    ...notification,
  };
}

function buildRealtimeNotification(): BackendNotificationApiItem {
  const variants = [
    {
      title: "Мучнистая роса",
      body: "Обнаружена мучнистая роса в секторе A-12",
      message: "Обнаружена мучнистая роса в секторе A-12",
      notification_type: "plant_disease_detected",
      payload: {
        sector: "Сектор A-12",
        disease: "Мучнистая роса",
        severity: "warning",
      },
    },
    {
      title: "Фитофтороз",
      body: "Обнаружены признаки фитофтороза в секторе B-04",
      message: "Обнаружены признаки фитофтороза в секторе B-04",
      notification_type: "plant_disease_detected",
      payload: {
        sector: "Сектор B-04",
        disease: "Фитофтороз",
        severity: "critical",
      },
    },
    {
      title: "Заболевание растения",
      body: "Зафиксировано заболевание растения в секторе C-18",
      message: "Зафиксировано заболевание растения в секторе C-18",
      notification_type: "plant_disease_detected",
      payload: {
        sector: "Сектор C-18",
        disease: "Кладоспориоз",
        severity: "warning",
      },
    },
  ] as const;
  const tick = Math.floor(Date.now() / 45000);
  const variant = variants[tick % variants.length];

  return buildNotification({
    id: `realtime-${tick}`,
    type: "plant_alert",
    status: "pending",
    created_at: new Date().toISOString(),
    ...variant,
  });
}

export async function GET() {
  const notifications: BackendNotificationApiItem[] = [
    buildRealtimeNotification(),
    buildNotification({
      id: "notification-1",
      title: "Мучнистая роса",
      body: "Обнаружена мучнистая роса в секторе A-12",
      message: "Обнаружена мучнистая роса в секторе A-12",
      status: "pending",
      type: "plant_alert",
      notification_type: "plant_disease_detected",
      payload: {
        sector: "Сектор A-12",
        disease: "Мучнистая роса",
        severity: "warning",
      },
      created_at: minutesAgo(12),
    }),
    buildNotification({
      id: "notification-2",
      title: "Фитофтороз",
      body: "Обнаружены признаки фитофтороза в секторе B-04",
      message: "Обнаружены признаки фитофтороза в секторе B-04",
      status: "pending",
      type: "plant_alert",
      notification_type: "plant_disease_detected",
      payload: {
        sector: "Сектор B-04",
        disease: "Фитофтороз",
        severity: "critical",
      },
      created_at: minutesAgo(74),
    }),
    buildNotification({
      id: "notification-3",
      title: "Серая гниль",
      body: "Зафиксировано заболевание растения в секторе C-18",
      message: "Зафиксировано заболевание растения в секторе C-18",
      status: "sent",
      type: "plant_alert",
      notification_type: "plant_disease_detected",
      payload: {
        sector: "Сектор C-18",
        disease: "Серая гниль",
        severity: "warning",
      },
      created_at: minutesAgo(24 * 60 + 38),
      read_at: minutesAgo(24 * 60),
    }),
  ];

  return NextResponse.json(notifications);
}
