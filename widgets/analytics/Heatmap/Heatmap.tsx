import type { HeatmapRow } from "@/entities/analytics";
import styles from "./Heatmap.module.scss";

interface HeatmapProps {
  rows: HeatmapRow[];
}

export function Heatmap({ rows }: HeatmapProps) {
  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <p>Тепловая карта теплиц</p>
        <h2>Визуальная карта состояния растений по зонам</h2>
      </div>

      <div className={styles.gridWrap}>
        <div className={styles.grid}>
          {rows.map((row) => (
            <div key={row.id} className={styles.row}>
              <span className={styles.rowTitle}>{row.title}</span>
              <div className={styles.cells}>
                {row.cells.map((cell) => (
                  <article
                    key={cell.id}
                    className={`${styles.cell} ${styles[cell.state]}`}
                  >
                    <strong>{cell.label}</strong>
                    <span>{cell.note}</span>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.legend}>
        <span><i className={styles.good} /> Здорово</span>
        <span><i className={styles.warning} /> Внимание</span>
        <span><i className={styles.critical} /> Критично</span>
      </div>
    </section>
  );
}
