const DEFAULT_TIME_ZONE = "Europe/Moscow";
const LOCALE = "ru-RU";

function getTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_TIME_ZONE;
}

function toDate(value: string | Date) {
  return value instanceof Date ? value : new Date(value);
}

function getParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat(LOCALE, {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);

  return {
    year: Number(parts.find((part) => part.type === "year")?.value),
    month: Number(parts.find((part) => part.type === "month")?.value),
    day: Number(parts.find((part) => part.type === "day")?.value),
  };
}

function isSameDay(left: Date, right: Date, timeZone: string) {
  const leftParts = getParts(left, timeZone);
  const rightParts = getParts(right, timeZone);

  return (
    leftParts.year === rightParts.year &&
    leftParts.month === rightParts.month &&
    leftParts.day === rightParts.day
  );
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
}

export function formatNotificationDate(value: string | Date) {
  const date = toDate(value);
  const timeZone = getTimeZone();

  return new Intl.DateTimeFormat(LOCALE, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatRelativeDate(value: string | Date, now = new Date()) {
  const date = toDate(value);
  const timeZone = getTimeZone();
  const time = formatNotificationDate(date);

  if (isSameDay(date, now, timeZone)) {
    return `Сегодня, ${time}`;
  }

  if (isSameDay(date, addDays(now, -1), timeZone)) {
    return `Вчера, ${time}`;
  }

  const dayMonth = new Intl.DateTimeFormat(LOCALE, {
    timeZone,
    day: "numeric",
    month: "long",
  }).format(date);

  return `${dayMonth}, ${time}`;
}
