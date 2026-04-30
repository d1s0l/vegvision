import type { ReactNode } from "react";
import { CalendarRange, ChevronDown, Leaf, SlidersHorizontal } from "lucide-react";
import type { AnalyticsFilterOption } from "@/entities/analytics";
import styles from "./AnalyticsHeader.module.scss";

interface AnalyticsHeaderProps {
  periodOptions: AnalyticsFilterOption[];
  greenhouseOptions: AnalyticsFilterOption[];
  cropOptions: AnalyticsFilterOption[];
}

function FilterSelect({
  label,
  icon,
  value,
}: {
  label: string;
  icon: ReactNode;
  value: string;
}) {
  return (
    <div className={styles.filter}>
      <span className={styles.filterLabel}>{label}</span>
      <button type="button" className={styles.filterButton}>
        <span className={styles.filterIcon}>{icon}</span>
        <span>{value}</span>
        <ChevronDown size={16} />
      </button>
    </div>
  );
}

export function AnalyticsHeader({
  periodOptions,
  greenhouseOptions,
  cropOptions,
}: AnalyticsHeaderProps) {
  return (
    <section className={styles.header}>
      <div className={styles.copy}>
        <div className={styles.badge}>
          <SlidersHorizontal size={16} />
          <span>Расширенная аналитика</span>
        </div>
        <h1>Аналитика</h1>
        <p>
          Расширенная аналитика мониторинга теплиц: камеры уже собирают поток,
          ML автоматически обрабатывает изображения, а frontend показывает
          полную картину по состоянию культур, рискам и эффективности системы.
        </p>
      </div>

      <div className={styles.filters}>
        <FilterSelect
          label="Период"
          icon={<CalendarRange size={16} />}
          value={periodOptions[1]?.label ?? "30 дней"}
        />
        <FilterSelect
          label="Теплица"
          icon={<SlidersHorizontal size={16} />}
          value={greenhouseOptions[0]?.label ?? "Все теплицы"}
        />
        <FilterSelect
          label="Культура"
          icon={<Leaf size={16} />}
          value={cropOptions[0]?.label ?? "Все культуры"}
        />
      </div>
    </section>
  );
}
