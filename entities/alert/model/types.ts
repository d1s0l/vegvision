export type AlertSeverity = "critical" | "warning" | "info";
export type AlertCategory =
  | "backend"
  | "ml"
  | "camera"
  | "api"
  | "security";

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  category: AlertCategory;
  createdAt: string;
  status: "new" | "acknowledged";
}
