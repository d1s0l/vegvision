import type { AlertItem } from "@/entities/alert";
import type { ClientSummary } from "@/entities/client";
import type { BillingMetric, RevenuePoint } from "@/entities/subscription";

export type AdminRole = "owner" | "support" | "ops" | "ml-admin";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar: string;
  lastLogin: string;
}

export interface AdminStat {
  id: string;
  label: string;
  value: string;
  detail: string;
  trend: string;
  tone: "neutral" | "good" | "warning";
}

export interface ActivityFeedItem {
  id: string;
  title: string;
  description: string;
  time: string;
  tone: "good" | "warning" | "critical" | "neutral";
}

export interface HealthMetric {
  id: string;
  label: string;
  value: string;
  state: "healthy" | "degraded" | "critical";
  description: string;
}

export interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface MonitoringMetric {
  id: string;
  label: string;
  value: string;
  target: string;
  state: "healthy" | "warning" | "critical";
}

export interface MlMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: "good" | "warning" | "neutral";
}

export interface ProductMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface InternalUserRow {
  id: string;
  name: string;
  role: AdminRole;
  permissions: string;
  session: string;
  activity: string;
}

export interface LogEntry {
  id: string;
  source: "auth" | "api" | "error" | "ml" | "audit";
  level: "info" | "warning" | "error";
  message: string;
  timestamp: string;
  actor: string;
}

export interface SettingsSection {
  id: string;
  title: string;
  description: string;
  items: Array<{
    id: string;
    label: string;
    value: string;
    hint: string;
  }>;
}

export interface AdminPanelData {
  currentAdmin: AdminUser;
  dashboardStats: AdminStat[];
  activityFeed: ActivityFeedItem[];
  systemHealth: HealthMetric[];
  quickActions: QuickActionItem[];
  clients: ClientSummary[];
  billingMetrics: BillingMetric[];
  revenue: RevenuePoint[];
  monitoring: MonitoringMetric[];
  mlMetrics: MlMetric[];
  alerts: AlertItem[];
  productMetrics: ProductMetric[];
  topClients: Array<{ id: string; company: string; requests: string; seats: number }>;
  internalUsers: InternalUserRow[];
  logs: LogEntry[];
  settings: SettingsSection[];
}
