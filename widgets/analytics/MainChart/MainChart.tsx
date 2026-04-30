import type { TrendPoint } from "@/entities/analytics";
import styles from "./MainChart.module.scss";

interface MainChartProps {
  points: TrendPoint[];
}

export function MainChart({ points }: MainChartProps) {
  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <div>
          <p>Главный график</p>
          <h2>Динамика заболеваний за выбранный период</h2>
        </div>
        <div className={styles.legend}>
          <span className={styles.alerts}>Сигналы</span>
          <span className={styles.resolved}>Закрыто</span>
        </div>
      </div>

      <div className={styles.chartWrap}>
        <svg
          viewBox="0 0 720 320"
          className={styles.chart}
          role="img"
          aria-label="График аналитики заболеваний"
        >
          <line x1="40" y1="40" x2="40" y2="270" className={styles.axis} />
          <line x1="40" y1="270" x2="680" y2="270" className={styles.axis} />
          <line x1="40" y1="90" x2="680" y2="90" className={styles.gridLine} />
          <line x1="40" y1="150" x2="680" y2="150" className={styles.gridLine} />
          <line x1="40" y1="210" x2="680" y2="210" className={styles.gridLine} />

          <path
            d="M60 180 C120 165, 150 128, 170 120 S270 160, 280 160 S360 78, 390 76 S470 116, 500 118 S590 174, 610 174"
            className={styles.alertPath}
          />
          <path
            d="M60 208 C110 198, 150 165, 170 158 S260 174, 280 172 S360 126, 390 124 S470 146, 500 144 S585 186, 610 186"
            className={styles.resolvePath}
          />

          {[
            ["60", "180", styles.alertDot],
            ["170", "120", styles.alertDot],
            ["280", "160", styles.alertDot],
            ["390", "76", styles.alertDot],
            ["500", "118", styles.alertDot],
            ["610", "174", styles.alertDot],
            ["60", "208", styles.resolveDot],
            ["170", "158", styles.resolveDot],
            ["280", "172", styles.resolveDot],
            ["390", "124", styles.resolveDot],
            ["500", "144", styles.resolveDot],
            ["610", "186", styles.resolveDot],
          ].map(([cx, cy, dotClass]) => (
            <circle key={`${cx}-${cy}-${dotClass}`} cx={cx} cy={cy} r="5" className={dotClass} />
          ))}
        </svg>
      </div>

      <div className={styles.labels}>
        {points.map((point) => (
          <div key={point.day} className={styles.labelItem}>
            <strong>{point.day}</strong>
            <span>{point.alerts} сигналов</span>
            <span>{point.resolved} закрыто</span>
          </div>
        ))}
      </div>
    </section>
  );
}
