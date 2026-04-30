import { recommendations } from "@/shared/constants/mockData";
import styles from "./Recommendations.module.scss";

export function Recommendations() {
  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <p>Рекомендации</p>
        <h2>Подсказки для команды и агрономов</h2>
      </div>

      <div className={styles.list}>
        {recommendations.map((item) => (
          <article
            key={item.id}
            className={`${styles.item} ${styles[item.tone]}`}
          >
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <button type="button" className={styles.button}>
              {item.ctaLabel}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
