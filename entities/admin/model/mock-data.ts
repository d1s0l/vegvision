import type { AlertItem } from "@/entities/alert";
import type { ClientSummary } from "@/entities/client";
import type { BillingMetric, RevenuePoint } from "@/entities/subscription";
import type {
  ActivityFeedItem,
  AdminPanelData,
  AdminStat,
  AdminUser,
  HealthMetric,
  InternalUserRow,
  LogEntry,
  MlMetric,
  MonitoringMetric,
  ProductMetric,
  QuickActionItem,
  SettingsSection,
} from "./types";

export const mockAdminCredentials = {
  email: "owner@vegvision.app",
  password: "Admin12345!",
};

const currentAdmin: AdminUser = {
  id: "admin-1",
  email: mockAdminCredentials.email,
  role: "owner",
  lastLogin: "Сегодня, 09:18",
};

const dashboardStats: AdminStat[] = [
  { id: "clients", label: "Всего клиентов", value: "128", detail: "12 enterprise-аккаунтов", trend: "+8 за месяц", tone: "good" },
  { id: "subscriptions", label: "Активные подписки", value: "112", detail: "94 оплаченных, 18 trial", trend: "+6.2% месяц к месяцу", tone: "good" },
  { id: "greenhouses", label: "Активные теплицы", value: "436", detail: "В 17 регионах", trend: "+21 подключено", tone: "neutral" },
  { id: "cameras", label: "Камеры онлайн", value: "2 384", detail: "96.4% live-покрытия", trend: "-14 на диагностике", tone: "warning" },
  { id: "analyses", label: "Анализов сегодня", value: "184 240", detail: "Нагрузка инференса сбалансирована", trend: "+11.3% к вчерашнему дню", tone: "good" },
  { id: "uptime", label: "Аптайм системы", value: "99.982%", detail: "Скользящее окно 30 дней", trend: "SLA в норме", tone: "good" },
  { id: "requests", label: "API-запросы", value: "8.7M", detail: "За последние 24 часа", trend: "142 req/s в среднем", tone: "neutral" },
  { id: "active-users", label: "Активные пользователи", value: "1 942", detail: "Еженедельно активные агрономы", trend: "+9.4% неделя к неделе", tone: "good" },
];

const activityFeed: ActivityFeedItem[] = [
  {
    id: "feed-1",
    title: "Enterprise-клиент перешёл на Scale",
    description: "Nord Agro расширился с 7 до 16 теплиц после успешной конверсии из trial.",
    time: "5 мин назад",
    tone: "good",
  },
  {
    id: "feed-2",
    title: "Очередь инференса превысила мягкий порог",
    description: "Глубина очереди достигла 1 240 задач в кластере eu-central. Автомасштабирование запущено.",
    time: "12 мин назад",
    tone: "warning",
  },
  {
    id: "feed-3",
    title: "Пайплайн retrain завершён",
    description: "Модель v2.14 закончила оценку с точностью 98.9% на валидации.",
    time: "27 мин назад",
    tone: "good",
  },
  {
    id: "feed-4",
    title: "Повторная оплата вернула overdue-аккаунт",
    description: "Платёж для Green Pulse прошёл успешно после обновления карты.",
    time: "41 мин назад",
    tone: "neutral",
  },
  {
    id: "feed-5",
    title: "Алерт по камерам подтверждён",
    description: "Поддержка отметила 8 отключённых edge-устройств как находящиеся на очном обслуживании.",
    time: "1 ч назад",
    tone: "critical",
  },
];

const systemHealth: HealthMetric[] = [
  {
    id: "backend",
    label: "Backend API",
    value: "Работает штатно",
    state: "healthy",
    description: "P95 latency 184 ms по публичным и партнёрским endpoint'ам.",
  },
  {
    id: "database",
    label: "Кластер базы данных",
    value: "Лаг реплики 120 ms",
    state: "healthy",
    description: "Primary и read-реплики остаются в нормальных SLA-границах.",
  },
  {
    id: "websocket",
    label: "Websocket gateway",
    value: "Есть деградация",
    state: "degraded",
    description: "После релиза 2026.05.21.2 в одном регионе выросло число переподключений.",
  },
  {
    id: "ml",
    label: "ML-инференс",
    value: "Стабильно",
    state: "healthy",
    description: "Загрузка GPU-пула стабильна, время обработки очереди ниже порога.",
  },
];

const quickActions: QuickActionItem[] = [
  {
    id: "new-client",
    title: "Открыть workspace клиента",
    description: "Проверить onboarding checklist и назначить success manager.",
    href: "/admin/clients",
  },
  {
    id: "incident",
    title: "Разобрать критические алерты",
    description: "Перейти в центр алертов с фильтром только по critical.",
    href: "/admin/alerts",
  },
  {
    id: "ml-audit",
    title: "Проверить rollout модели",
    description: "Оценить загрузку GPU, очередь и метрики model drift.",
    href: "/admin/ml-system",
  },
  {
    id: "billing-audit",
    title: "Проверить просроченные инвойсы",
    description: "Посмотреть churn risk и неудачные попытки списания по сегментам.",
    href: "/admin/billing",
  },
];

const clients: ClientSummary[] = [
  {
    id: "client-1",
    companyName: "Nord Agro",
    plan: "Enterprise",
    subscriptionStatus: "active",
    greenhouseCount: 16,
    cameraCount: 144,
    registrationDate: "11 янв 2026",
    lastActivity: "2 мин назад",
    monthlySpend: "$8,400",
    accountOwner: "М. Хоффман",
  },
  {
    id: "client-2",
    companyName: "Green Pulse",
    plan: "Scale",
    subscriptionStatus: "past_due",
    greenhouseCount: 9,
    cameraCount: 88,
    registrationDate: "29 ноя 2025",
    lastActivity: "14 мин назад",
    monthlySpend: "$4,920",
    accountOwner: "А. Петрова",
  },
  {
    id: "client-3",
    companyName: "Floratek Labs",
    plan: "Growth",
    subscriptionStatus: "active",
    greenhouseCount: 4,
    cameraCount: 32,
    registrationDate: "05 мар 2026",
    lastActivity: "53 мин назад",
    monthlySpend: "$1,480",
    accountOwner: "Л. Соколов",
  },
  {
    id: "client-4",
    companyName: "Sunroot Farms",
    plan: "Starter",
    subscriptionStatus: "trial",
    greenhouseCount: 2,
    cameraCount: 12,
    registrationDate: "14 мая 2026",
    lastActivity: "1 ч назад",
    monthlySpend: "$0",
    accountOwner: "Дж. Белл",
  },
  {
    id: "client-5",
    companyName: "Aurora Harvest",
    plan: "Scale",
    subscriptionStatus: "blocked",
    greenhouseCount: 7,
    cameraCount: 65,
    registrationDate: "18 сен 2025",
    lastActivity: "Вчера",
    monthlySpend: "$3,760",
    accountOwner: "Е. Воронина",
  },
];

const billingMetrics: BillingMetric[] = [
  { id: "mrr", label: "MRR", value: "$184,200", detail: "Чистая регулярная выручка", trend: "+7.8% месяц к месяцу" },
  { id: "subscriptions", label: "Подписки", value: "112", detail: "По всем платным тарифам", trend: "+6 чистых подключений" },
  { id: "trial-users", label: "Trial-аккаунты", value: "18", detail: "Средний возраст 9 дней", trend: "4 конвертируются на этой неделе" },
  { id: "payments", label: "Успешные платежи", value: "96.7%", detail: "За последние 30 дней", trend: "+1.2 п.п." },
];

const revenue: RevenuePoint[] = [
  { month: "Янв", revenue: 128, invoices: 96 },
  { month: "Фев", revenue: 136, invoices: 103 },
  { month: "Мар", revenue: 149, invoices: 108 },
  { month: "Апр", revenue: 164, invoices: 117 },
  { month: "Май", revenue: 184, invoices: 124 },
];

const monitoring: MonitoringMetric[] = [
  { id: "cpu", label: "Загрузка CPU", value: "44%", target: "< 70%", state: "healthy" },
  { id: "ram", label: "Использование RAM", value: "68%", target: "< 80%", state: "healthy" },
  { id: "latency", label: "Задержка API", value: "184 ms", target: "< 250 ms", state: "healthy" },
  { id: "db", label: "Статус БД", value: "Primary + 3 replicas", target: "Синхронизировано", state: "healthy" },
  { id: "ws", label: "Статус websocket", value: "98.9% connected", target: "> 99.5%", state: "warning" },
  { id: "rpm", label: "Запросов в минуту", value: "8 520", target: "Стабильно", state: "healthy" },
];

const mlMetrics: MlMetric[] = [
  { id: "model", label: "Версия модели", value: "v2.14", detail: "Развёрнута 8 часов назад", tone: "good" },
  { id: "queue", label: "Очередь инференса", value: "1 240", detail: "Достигнут мягкий порог", tone: "warning" },
  { id: "gpu", label: "Загрузка GPU", value: "72%", detail: "Кластер eu-central", tone: "neutral" },
  { id: "accuracy", label: "Точность", value: "98.9%", detail: "Валидационный набор", tone: "good" },
  { id: "latency", label: "Задержка", value: "1.7s", detail: "Медианное время результата", tone: "good" },
  { id: "processed", label: "Обработано изображений", value: "4.8M", detail: "За последние 7 дней", tone: "neutral" },
];

const alerts: AlertItem[] = [
  {
    id: "alert-1",
    title: "Рост очереди инференса в eu-central",
    description: "Автомасштабирование воркеров сработало после устойчивого роста очереди более 15 минут.",
    severity: "critical",
    category: "ml",
    createdAt: "10:41",
    status: "new",
  },
  {
    id: "alert-2",
    title: "Часть камер клиента офлайн",
    description: "Восемь устройств Aurora Harvest сообщили об отключении после обновления gateway.",
    severity: "warning",
    category: "camera",
    createdAt: "10:12",
    status: "acknowledged",
  },
  {
    id: "alert-3",
    title: "Всплеск ошибок API на billing webhook",
    description: "Повторные вызовы от платёжного провайдера превысили обычный дневной baseline.",
    severity: "warning",
    category: "api",
    createdAt: "09:56",
    status: "new",
  },
  {
    id: "alert-4",
    title: "Рост неудачных попыток admin login",
    description: "Правило безопасности зафиксировало повторяющиеся попытки с двух диапазонов IP.",
    severity: "critical",
    category: "security",
    createdAt: "09:08",
    status: "new",
  },
];

const productMetrics: ProductMetric[] = [
  { id: "dau", label: "DAU", value: "612", detail: "+12.4% неделя к неделе" },
  { id: "mau", label: "MAU", value: "1 942", detail: "+8.9% месяц к месяцу" },
  { id: "retention", label: "Retention", value: "88%", detail: "Enterprise-аккаунты, день 30" },
  { id: "api-usage", label: "Использование API", value: "8.7M", detail: "Объём запросов за 24 часа" },
];

const topClients = [
  { id: "top-1", company: "Nord Agro", requests: "1.8M", seats: 42 },
  { id: "top-2", company: "Green Pulse", requests: "1.2M", seats: 26 },
  { id: "top-3", company: "Floratek Labs", requests: "860K", seats: 14 },
];

const internalUsers: InternalUserRow[] = [
  {
    id: "iu-1",
    name: "Елена Воронина",
    role: "owner",
    permissions: "Полный доступ",
    session: "Текущая сессия · Москва",
    activity: "Проверяла биллинг и алерты платформы",
  },
  {
    id: "iu-2",
    name: "Дмитрий Ларин",
    role: "ops",
    permissions: "Инфраструктура, логи, инциденты",
    session: "2 активные сессии",
    activity: "Отслеживает переподключения websocket",
  },
  {
    id: "iu-3",
    name: "Sara Klein",
    role: "support",
    permissions: "Клиенты, подписки",
    session: "1 активная сессия",
    activity: "Обработала 12 enterprise-тикетов сегодня",
  },
];

const logs: LogEntry[] = [
  {
    id: "log-1",
    source: "auth",
    level: "warning",
    message: "Неудачная попытка входа администратора с 178.44.91.12",
    timestamp: "2026-05-21 10:08:14",
    actor: "system",
  },
  {
    id: "log-2",
    source: "api",
    level: "info",
    message: "POST /v1/analysis/batch завершён за 184 ms",
    timestamp: "2026-05-21 10:10:42",
    actor: "gateway",
  },
  {
    id: "log-3",
    source: "error",
    level: "error",
    message: "Порог повторов billing webhook превышен для аккаунта client-2",
    timestamp: "2026-05-21 10:11:31",
    actor: "billing-worker",
  },
  {
    id: "log-4",
    source: "ml",
    level: "warning",
    message: "Длина очереди инференса превысила 1 000 задач в eu-central",
    timestamp: "2026-05-21 10:14:09",
    actor: "ml-queue-monitor",
  },
  {
    id: "log-5",
    source: "audit",
    level: "info",
    message: "Тариф клиента Nord Agro изменён с Growth на Scale",
    timestamp: "2026-05-21 10:17:56",
    actor: "Елена Воронина",
  },
];

const settings: SettingsSection[] = [
  {
    id: "thresholds",
    title: "ML-пороги",
    description: "Ключевые пороги модели для confidence score и эскалации.",
    items: [
      { id: "confidence", label: "Критический confidence", value: "0.89", hint: "Выше этого значения поднимать красный алерт." },
      { id: "drift", label: "Допуск по drift", value: "2.5%", hint: "Запускать валидационную проверку при превышении." },
    ],
  },
  {
    id: "notifications",
    title: "Уведомления",
    description: "Платформенные правила маршрутизации инцидентов и сводок.",
    items: [
      { id: "slack", label: "Slack-канал инцидентов", value: "#vegvision-ops", hint: "Основной маршрут для Sev-1 уведомлений." },
      { id: "digest", label: "Ежедневный дайджест", value: "07:30 UTC", hint: "Отправляется руководству и customer success." },
    ],
  },
  {
    id: "security",
    title: "Настройки безопасности",
    description: "Политики сессий и усиление доступа администраторов.",
    items: [
      { id: "session", label: "TTL admin-сессии", value: "15 мин", hint: "Время жизни access token в памяти." },
      { id: "mfa", label: "Политика MFA", value: "Обязательно", hint: "Требуется для всех внутренних ролей." },
    ],
  },
];

export const adminPanelData: AdminPanelData = {
  currentAdmin,
  dashboardStats,
  activityFeed,
  systemHealth,
  quickActions,
  clients,
  billingMetrics,
  revenue,
  monitoring,
  mlMetrics,
  alerts,
  productMetrics,
  topClients,
  internalUsers,
  logs,
  settings,
};
