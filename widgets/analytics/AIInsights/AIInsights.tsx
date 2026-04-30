import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import type { InsightItem } from "@/entities/analytics";
import styles from "./AIInsights.module.scss";

interface AIInsightsProps {
  items: InsightItem[];
}

export function AIInsights({ items }: AIInsightsProps) {
  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <p>AI-инсайты</p>
        <h2>Рекомендации и выводы ML-системы</h2>
      </div>

      <div className={styles.list}>
        {items.map((item) => (
          <article key={item.id} className={`${styles.item} ${styles[item.tone]}`}>
            <div className={styles.iconWrap}>
              {item.tone === "good" && <CheckCircle2 size={18} />}
              {item.tone === "warning" && <AlertTriangle size={18} />}
              {item.tone === "critical" && <ShieldAlert size={18} />}
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
