export interface DashboardSummaryItem {
  id: string;
  icon: string;
  title: string;
  value: string;
}

export const dashboardSummary: DashboardSummaryItem[] = [
  {
    id: "detected-problems",
    icon: "/lk/shield-icon.svg",
    title: "Обнаружено проблем",
    value: "20",
  },
  {
    id: "active-analyses",
    icon: "/lk/pulse-icon.svg",
    title: "Активные анализы",
    value: "5",
  },
  {
    id: "greenhouse-cameras-1",
    icon: "/lk/camera-icon.svg",
    title: "Камеры в теплицах",
    value: "15",
  },
  {
    id: "greenhouse-cameras-2",
    icon: "/lk/camera-icon.svg",
    title: "Камеры в теплицах",
    value: "15",
  },
];
