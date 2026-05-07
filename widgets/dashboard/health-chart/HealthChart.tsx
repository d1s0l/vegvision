import { healthChartData } from "@/shared/constants/mockData";
import styles from "./HealthChart.module.scss";

const chartHeight = 240;
const chartWidth = 620;
const maxValue = 100;

function buildPoints(values: number[]) {
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * chartWidth;
      const y = chartHeight - (value / maxValue) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");
}

export function HealthChart() {
  const healthyPoints = buildPoints(healthChartData.map((item) => item.healthy));
  const riskPoints = buildPoints(healthChartData.map((item) => item.risk));

  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <div>
          <p>Динамика здоровья растений</p>
          <h2>Тренд за последнюю неделю</h2>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendHealthy}>Здоровые</span>
          <span className={styles.legendRisk}>Риск</span>
        </div>
      </div>

      <div className={styles.chartWrap}>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}
          className={styles.chart}
          aria-label="График динамики здоровья растений"
          role="img"
        >
          {[0, 25, 50, 75, 100].map((value) => {
            const y = chartHeight - (value / maxValue) * chartHeight;

            return (
              <g key={value} className={styles.axisTickGroup}>
                <line
                  x1="0"
                  x2={chartWidth}
                  y1={y}
                  y2={y}
                  className={styles.gridLine}
                />
                <text x="0" y={y - 8} className={styles.axisLabel}>
                  {value}%
                </text>
              </g>
            );
          })}

          <polyline points={riskPoints} className={styles.riskLine} />
          <polyline points={healthyPoints} className={styles.healthyLine} />

          {healthChartData.map((point, index) => {
            const x = (index / (healthChartData.length - 1)) * chartWidth;
            const healthyY = chartHeight - (point.healthy / maxValue) * chartHeight;
            const riskY = chartHeight - (point.risk / maxValue) * chartHeight;

            return (
              <g key={point.label}>
                <circle cx={x} cy={healthyY} r="5" className={styles.healthyDot} />
                <circle cx={x} cy={riskY} r="5" className={styles.riskDot} />
                <text x={x} y={chartHeight + 28} className={styles.bottomLabel}>
                  {point.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
