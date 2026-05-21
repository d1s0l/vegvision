import type { ActivityFeedItem } from "@/entities/admin";
import styles from "./ActivityFeed.module.scss";

interface ActivityFeedProps {
  items: ActivityFeedItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <article key={item.id} className={`${styles.item} ${styles[item.tone]}`}>
          <div className={styles.marker} />
          <div className={styles.body}>
            <div className={styles.top}>
              <strong>{item.title}</strong>
              <span>{item.time}</span>
            </div>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
