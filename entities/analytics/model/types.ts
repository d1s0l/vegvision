export interface AnalyticsFilterOption {
  id: string;
  label: string;
}

export interface AnalyticsKpi {
  id: string;
  label: string;
  value: string;
  detail: string;
  trend: string;
  tone: "good" | "warning" | "critical" | "neutral";
}

export interface TrendPoint {
  day: string;
  alerts: number;
  resolved: number;
}

export interface HeatmapCell {
  id: string;
  label: string;
  state: "good" | "warning" | "critical";
  note: string;
}

export interface HeatmapRow {
  id: string;
  title: string;
  cells: HeatmapCell[];
}

export interface DiseaseStat {
  id: string;
  name: string;
  spread: string;
  risk: string;
  shareClass:
    | "share72"
    | "share54"
    | "share38"
    | "share27"
    | "share18";
  tone: "good" | "warning" | "critical";
}

export interface InsightItem {
  id: string;
  title: string;
  description: string;
  tone: "good" | "warning" | "critical";
}

export interface ComparisonItem {
  id: string;
  label: string;
  current: string;
  previous: string;
  delta: string;
  trend: "up" | "down" | "stable";
}

export interface ActivityItem {
  id: string;
  time: string;
  title: string;
  description: string;
  tone: "good" | "warning" | "critical" | "neutral";
}

export interface MlStatusMetric {
  id: string;
  label: string;
  value: string;
}

export interface MlSystemStatus {
  title: string;
  state: string;
  stateTone: "good" | "warning";
  description: string;
  lastUpdate: string;
  metrics: MlStatusMetric[];
}

export interface AnalyticsPageData {
  periodOptions: AnalyticsFilterOption[];
  greenhouseOptions: AnalyticsFilterOption[];
  cropOptions: AnalyticsFilterOption[];
  kpis: AnalyticsKpi[];
  trend: TrendPoint[];
  heatmap: HeatmapRow[];
  diseases: DiseaseStat[];
  insights: InsightItem[];
  comparison: ComparisonItem[];
  activity: ActivityItem[];
  mlStatus: MlSystemStatus;
}
