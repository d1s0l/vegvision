import type { AnalyticsKpi } from "@/entities/analytics";
import styles from "./KPISection.module.scss";

interface KPISectionProps {
  items: AnalyticsKpi[];
}

export function KPISection({ items }: KPISectionProps) {
  return (
    <section className={styles.grid}>
      {items.map((item) => (
        <article key={item.id} className={`${styles.card} ${styles[item.tone]}`}>
          <p>{item.label}</p>
          <strong>{item.value}</strong>
          <span className={styles.detail}>{item.detail}</span>
          <span className={styles.trend}>{item.trend}</span>
        </article>
      ))}
    </section>
  );
}
