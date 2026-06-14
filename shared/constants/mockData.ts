export type DashboardStatId =
  | "plants"
  | "active-analyses"
  | "issues"
  | "accuracy";

export interface DashboardStat {
  id: DashboardStatId;
  title: string;
  value: string;
  detail: string;
  trend: string;
}

export interface PlantStatusSegment {
  label: string;
  value: number;
  detail: string;
}

export type AnalysisStatus = "healthy" | "attention" | "critical";

export interface RecentAnalysisItem {
  id: string;
  plantName: string;
  greenhouse: string;
  analysedAt: string;
  status: AnalysisStatus;
  diagnosis: string;
  image: string;
}

export interface HealthChartPoint {
  label: string;
  healthy: number;
  risk: number;
}

export type RecommendationTone = "warning" | "action" | "info";

export interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  tone: RecommendationTone;
  ctaLabel: string;
}

export interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface GreenhouseMetric {
  label: string;
  value: string;
}

export interface GreenhouseStatusItem {
  id: string;
  name: string;
  status: string;
  cameraStatus: string;
  monitoringState: string;
  image: string;
  metrics: GreenhouseMetric[];
}

export const dashboardStats: DashboardStat[] = [
  {
    id: "plants",
    title: "Всего растений",
    value: "12 480",
    detail: "Во всех тепличных секторах",
    trend: "+8.4% за неделю",
  },
  {
    id: "active-analyses",
    title: "Активные камеры",
    value: "1",
    detail: "Одна камера передает поток для ML анализа",
    trend: "Активна одна камера",
  },
  {
    id: "issues",
    title: "Обнаружено проблем",
    value: "37",
    detail: "Требуют внимания агронома",
    trend: "-12% к прошлым суткам",
  },
  {
    id: "accuracy",
    title: "Точность диагностики",
    value: "98.7%",
    detail: "Средняя уверенность модели",
    trend: "+0.6% за 30 дней",
  },
];

export const plantStatusSegments: PlantStatusSegment[] = [
  {
    label: "Здоровые растения",
    value: 82,
    detail: "Основной массив растений без отклонений",
  },
  {
    label: "Зона риска",
    value: 12,
    detail: "Есть ранние сигналы по влажности и пятнистости",
  },
  {
    label: "Проблемные растения",
    value: 6,
    detail: "Нужны точечная проверка и обработка",
  },
];

export const recentAnalyses: RecentAnalysisItem[] = [
  {
    id: "analysis-1",
    plantName: "Томат черри",
    greenhouse: "Теплица A-12",
    analysedAt: "15:24",
    status: "healthy",
    diagnosis: "Листовая пластина без патологий",
    image: "/tomato-leaf.jpg",
  },
  {
    id: "analysis-2",
    plantName: "Огурец F1",
    greenhouse: "Теплица B-04",
    analysedAt: "15:12",
    status: "attention",
    diagnosis: "Риск грибкового поражения 23%",
    image: "/tomato-leaf.jpg",
  },
  {
    id: "analysis-3",
    plantName: "Базилик",
    greenhouse: "Теплица C-07",
    analysedAt: "14:57",
    status: "critical",
    diagnosis: "Найдены признаки бактериальной пятнистости",
    image: "/tomato-leaf.jpg",
  },
  {
    id: "analysis-4",
    plantName: "Салат ромэн",
    greenhouse: "Теплица D-02",
    analysedAt: "14:41",
    status: "healthy",
    diagnosis: "Стабильный рост и однородный цвет",
    image: "/tomato-leaf.jpg",
  },
];

export const healthChartData: HealthChartPoint[] = [
  { label: "Пн", healthy: 78, risk: 18 },
  { label: "Вт", healthy: 80, risk: 16 },
  { label: "Ср", healthy: 79, risk: 17 },
  { label: "Чт", healthy: 81, risk: 14 },
  { label: "Пт", healthy: 82, risk: 13 },
  { label: "Сб", healthy: 84, risk: 11 },
  { label: "Вс", healthy: 82, risk: 12 },
];

export const recommendations: RecommendationItem[] = [
  {
    id: "recommendation-1",
    title: "Проверьте сектор B-04",
    description:
      "Камеры фиксируют рост влажности и ранние признаки грибкового риска на уровне среднего яруса.",
    tone: "warning",
    ctaLabel: "Открыть сектор",
  },
  {
    id: "recommendation-2",
    title: "Обновите график вентиляции",
    description:
      "Сдвиг ночного проветривания на 30 минут снизит вероятность конденсата в восточном блоке.",
    tone: "action",
    ctaLabel: "Применить план",
  },
  {
    id: "recommendation-3",
    title: "Сформировать отчет для агронома",
    description:
      "Система собрала 6 кейсов с повторяющимися паттернами, полезными для утреннего обхода.",
    tone: "info",
    ctaLabel: "Скачать отчет",
  },
];

export const quickActions: QuickActionItem[] = [
  {
    id: "analytics",
    title: "Просмотр аналитики",
    description: "Открыть сводные данные по теплицам и культурам",
    href: "/",
  },
  {
    id: "reports",
    title: "Открыть отчеты",
    description: "Перейти к недельным и месячным отчетам",
    href: "/",
  },
  {
    id: "history",
    title: "История мониторинга",
    description: "Посмотреть ленту прошлых анализов и событий",
    href: "/",
  },
  {
    id: "export",
    title: "Экспорт данных",
    description: "Выгрузить актуальную аналитику в CSV",
    href: "/",
  },
];

export const greenhouseStatuses: GreenhouseStatusItem[] = [
  {
    id: "greenhouse-1",
    name: "Теплица A-12",
    status: "Стабильный режим",
    cameraStatus: "1 камера активна",
    monitoringState: "Поток данных стабилен",
    image: "/greenhouse.svg",
    metrics: [
      { label: "Температура", value: "24°C" },
      { label: "Влажность", value: "63%" },
      { label: "Осадки", value: "0 мм" },
    ],
  },
  {
    id: "greenhouse-2",
    name: "Теплица B-04",
    status: "Требуется внимание",
    cameraStatus: "Камера на диагностике",
    monitoringState: "Нужна ручная проверка",
    image: "/greenhouse.svg",
    metrics: [
      { label: "Температура", value: "26°C" },
      { label: "Влажность", value: "72%" },
      { label: "Осадки", value: "0 мм" },
    ],
  },
  {
    id: "greenhouse-3",
    name: "Теплица C-07",
    status: "Оптимальные условия",
    cameraStatus: "Камера ожидает подключения",
    monitoringState: "Поток данных недоступен",
    image: "/greenhouse.svg",
    metrics: [
      { label: "Температура", value: "22°C" },
      { label: "Влажность", value: "58%" },
      { label: "Осадки", value: "0 мм" },
    ],
  },
];
