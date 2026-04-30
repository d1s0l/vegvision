import { ArrowDownRight, ArrowRightLeft, ArrowUpRight } from "lucide-react";
import type { ComparisonItem } from "@/entities/analytics";
import styles from "./ComparisonSection.module.scss";

interface ComparisonSectionProps {
  items: ComparisonItem[];
}

export function ComparisonSection({ items }: ComparisonSectionProps) {
  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <p>Сравнение периодов</p>
        <h2>Изменение ключевых метрик относительно прошлого периода</h2>
      </div>

      <div className={styles.list}>
        {items.map((item) => (
          <article key={item.id} className={styles.item}>
            <div className={styles.top}>
              <h3>{item.label}</h3>
              <span className={`${styles.delta} ${styles[item.trend]}`}>
                {item.trend === "up" && <ArrowUpRight size={16} />}
                {item.trend === "down" && <ArrowDownRight size={16} />}
                {item.trend === "stable" && <ArrowRightLeft size={16} />}
                {item.delta}
              </span>
            </div>

            <div className={styles.values}>
              <div>
                <span>Текущий</span>
                <strong>{item.current}</strong>
              </div>
              <div>
                <span>Прошлый</span>
                <strong>{item.previous}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
