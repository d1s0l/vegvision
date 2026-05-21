import type { HealthMetric } from "@/entities/admin";
import styles from "./SystemHealth.module.scss";

interface SystemHealthProps {
  items: HealthMetric[];
}

export function SystemHealth({ items }: SystemHealthProps) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <article key={item.id} className={styles.item}>
          <div className={styles.top}>
            <strong>{item.label}</strong>
            <span className={`${styles.state} ${styles[item.state]}`}>{item.value}</span>
          </div>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
}
