import { plantStatusSegments } from "@/shared/constants/mockData";
import styles from "./PlantStatus.module.scss";

const circumference = 2 * Math.PI * 78;

export function PlantStatus() {
  const chartSegments = plantStatusSegments.reduce<
    Array<{
      label: string;
      value: number;
      strokeClassName: string;
      strokeDasharray: string;
      strokeDashoffset: number;
    }>
  >((accumulator, segment, index) => {
    const previousOffset = accumulator.reduce((total, item) => {
      const [segmentLength] = item.strokeDasharray.split(" ");
      return total + Number(segmentLength);
    }, 0);
    const segmentLength = (segment.value / 100) * circumference;

    accumulator.push({
      label: segment.label,
      value: segment.value,
      strokeClassName:
        index === 0 ? styles.healthy : index === 1 ? styles.risk : styles.problem,
      strokeDasharray: `${segmentLength} ${circumference - segmentLength}`,
      strokeDashoffset: -previousOffset,
    });

    return accumulator;
  }, []);

  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Состояние растений</p>
          <h2>Общая картина по всем тепличным блокам</h2>
        </div>
        <span className={styles.total}>82% здоровых растений</span>
      </div>

      <div className={styles.content}>
        <div className={styles.chartWrap} aria-hidden="true">
          <svg viewBox="0 0 220 220" className={styles.chart}>
            <circle
              cx="110"
              cy="110"
              r="78"
              className={styles.track}
            />

            {chartSegments.map((segment) => (
              <circle
                key={segment.label}
                cx="110"
                cy="110"
                r="78"
                className={segment.strokeClassName}
                strokeDasharray={segment.strokeDasharray}
                strokeDashoffset={segment.strokeDashoffset}
              />
            ))}
          </svg>

          <div className={styles.chartCenter}>
            <strong>94%</strong>
            <span>покрытие камер</span>
          </div>
        </div>

        <div className={styles.legend}>
          {plantStatusSegments.map((segment, index) => (
            <article key={segment.label} className={styles.legendItem}>
              <div className={styles.legendTop}>
                <span
                  className={`${styles.dot} ${
                    index === 0
                      ? styles.dotHealthy
                      : index === 1
                        ? styles.dotRisk
                        : styles.dotProblem
                  }`}
                />
                <h3>{segment.label}</h3>
                <strong>{segment.value}%</strong>
              </div>
              <p>{segment.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
