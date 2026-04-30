import type {
  AnalysisInsight,
  AnalysisMetric,
  AnalysisStage,
  PlantAnalysis,
  PlantStatus,
} from "./types";

export const plantStatusText: Record<PlantStatus, string> = {
  Good: "Здоровое",
  Risk: "Риск заболевания",
  Problem: "Обнаружено заболевание",
};

export const recentAnalyses: PlantAnalysis[] = [
  {
    id: "1",
    image: "/tomato-leaf.png",
    name: "Томаты черри",
    place: "Теплица A-12",
    date: "30.04.2026 · 15:24",
    status: "Good",
  },
  {
    id: "2",
    image: "/tomato-leaf.png",
    name: "Огурец F1",
    place: "Теплица B-04",
    date: "30.04.2026 · 15:12",
    status: "Risk",
  },
  {
    id: "3",
    image: "/tomato-leaf.png",
    name: "Базилик",
    place: "Теплица C-07",
    date: "30.04.2026 · 14:57",
    status: "Problem",
  },
  {
    id: "4",
    image: "/tomato-leaf.png",
    name: "Салат ромэн",
    place: "Теплица D-02",
    date: "30.04.2026 · 14:41",
    status: "Good",
  },
];

export const analysisMetrics: AnalysisMetric[] = [
  {
    id: "losses",
    title: "Потери под контролем",
    value: "20-40%",
    detail: "Такой объем урожая теплицы могут терять без ранней диагностики и регулярного мониторинга.",
  },
  {
    id: "speed",
    title: "Ранний сигнал",
    value: "3 день",
    detail: "VegVision замечает изменения в листьях раньше, чем симптомы становятся заметны при обходе.",
  },
  {
    id: "monitoring",
    title: "Непрерывный мониторинг",
    value: "24/7",
    detail: "Система анализирует поток с камер без пауз и не требует ручной проверки каждого растения.",
  },
  {
    id: "confidence",
    title: "Уверенность модели",
    value: "94-98%",
    detail: "Алгоритм формирует диагноз и рекомендации, чтобы команда принимала решения на основе данных.",
  },
];

export const analysisStages: AnalysisStage[] = [
  {
    id: "capture",
    title: "Сбор изображений с камер",
    description:
      "Потоки из существующих камер собираются автоматически по культурам, секторам и тепличным блокам.",
  },
  {
    id: "detect",
    title: "Выявление отклонений на ранней стадии",
    description:
      "Модель сравнивает цвет, фактуру и динамику листа, чтобы заметить стресс и риски до визуально явной фазы.",
  },
  {
    id: "act",
    title: "Диагноз и понятное действие",
    description:
      "После анализа команда видит риск, проблемную зону и следующий шаг, а не просто сырое изображение с камеры.",
  },
];

export const analysisInsights: AnalysisInsight[] = [
  {
    id: "manual",
    title: "Меньше ручного контроля",
    description:
      "Агрономам не нужно ежедневно проходить тысячи растений: VegVision поднимает только действительно важные кейсы.",
  },
  {
    id: "integration",
    title: "Интеграция в текущую теплицу",
    description:
      "Логика анализа рассчитана на работу с уже установленными камерами, без перегрузки команды новыми процессами.",
  },
  {
    id: "decision",
    title: "Решения вместо догадок",
    description:
      "Система помогает уйти от поздней реакции и случайных советов, показывая объективную картину по каждой культуре.",
  },
];
