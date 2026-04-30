import { AlertTriangle, CheckCircle2, Dot, ShieldAlert } from "lucide-react";
import type { ActivityItem } from "@/entities/analytics";
import styles from "./ActivityTimeline.module.scss";

interface ActivityTimelineProps {
  items: ActivityItem[];
}

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <p>Лента активности</p>
        <h2>Последние события системы, сигналы и обновления</h2>
      </div>

      <div className={styles.timeline}>
        {items.map((item) => (
          <article key={item.id} className={styles.item}>
            <div className={styles.markerColumn}>
              <span className={`${styles.marker} ${styles[item.tone]}`}>
                {item.tone === "good" && <CheckCircle2 size={16} />}
                {item.tone === "warning" && <AlertTriangle size={16} />}
                {item.tone === "critical" && <ShieldAlert size={16} />}
                {item.tone === "neutral" && <Dot size={20} />}
              </span>
              <span className={styles.line} />
            </div>

            <div className={styles.content}>
              <span className={styles.time}>{item.time}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
