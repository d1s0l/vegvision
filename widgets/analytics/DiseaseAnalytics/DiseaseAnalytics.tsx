import type { DiseaseStat } from "@/entities/analytics";
import styles from "./DiseaseAnalytics.module.scss";

interface DiseaseAnalyticsProps {
  items: DiseaseStat[];
}

export function DiseaseAnalytics({ items }: DiseaseAnalyticsProps) {
  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <p>Аналитика заболеваний</p>
        <h2>Типы заболеваний, доля распространения и уровень риска</h2>
      </div>

      <div className={styles.list}>
        {items.map((item) => (
          <article key={item.id} className={styles.item}>
            <div className={styles.top}>
              <div>
                <h3>{item.name}</h3>
                <p>Распространение: {item.spread}</p>
              </div>
              <span className={`${styles.badge} ${styles[item.tone]}`}>
                {item.risk}
              </span>
            </div>

            <div className={styles.progressTrack}>
              <span className={`${styles.progressFill} ${styles[item.shareClass]} ${styles[item.tone]}`} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
