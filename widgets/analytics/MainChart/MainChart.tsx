import type { TrendPoint } from "@/entities/analytics";
import styles from "./MainChart.module.scss";

interface MainChartProps {
  points: TrendPoint[];
}

const chartWidth = 720;
const chartHeight = 320;
const chartPadding = {
  top: 32,
  right: 28,
  bottom: 52,
  left: 40,
};

function createChartPoints(values: number[], maxValue: number) {
  const drawableWidth = chartWidth - chartPadding.left - chartPadding.right;
  const drawableHeight = chartHeight - chartPadding.top - chartPadding.bottom;

  return values.map((value, index) => {
    const x =
      chartPadding.left +
      (index / Math.max(values.length - 1, 1)) * drawableWidth;
    const y =
      chartPadding.top + drawableHeight - (value / Math.max(maxValue, 1)) * drawableHeight;

    return { x, y };
  });
}

function buildPath(points: Array<{ x: number; y: number }>) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
}

export function MainChart({ points }: MainChartProps) {
  const maxMetric = Math.max(...points.flatMap((point) => [point.alerts, point.resolved]));
  const maxValue = Math.max(10, Math.ceil(maxMetric / 10) * 10);
  const drawableWidth = chartWidth - chartPadding.left - chartPadding.right;
  const axisBottom = chartHeight - chartPadding.bottom;
  const chartTop = chartPadding.top;
  const chartHeightInner = axisBottom - chartTop;
  const yTicks = Array.from({ length: 5 }, (_, index) =>
    Math.round((maxValue / 4) * index),
  ).reverse();
  const alertPoints = createChartPoints(
    points.map((point) => point.alerts),
    maxValue,
  );
  const resolvedPoints = createChartPoints(
    points.map((point) => point.resolved),
    maxValue,
  );

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
        <div className={styles.scrollArea}>
          <div className={styles.chartInner}>
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className={styles.chart}
              role="img"
              aria-label="График аналитики заболеваний"
            >
              {yTicks.map((tick) => {
                const y = chartTop + chartHeightInner - (tick / maxValue) * chartHeightInner;

                return (
                  <g key={tick}>
                    <line
                      x1={chartPadding.left}
                      y1={y}
                      x2={chartPadding.left + drawableWidth}
                      y2={y}
                      className={styles.gridLine}
                    />
                    <text
                      x={chartPadding.left - 10}
                      y={y + 4}
                      className={styles.axisLabel}
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              <line
                x1={chartPadding.left}
                y1={chartTop}
                x2={chartPadding.left}
                y2={axisBottom}
                className={styles.axis}
              />
              <line
                x1={chartPadding.left}
                y1={axisBottom}
                x2={chartPadding.left + drawableWidth}
                y2={axisBottom}
                className={styles.axis}
              />

              <path d={buildPath(alertPoints)} className={styles.alertPath} />
              <path d={buildPath(resolvedPoints)} className={styles.resolvePath} />

              {alertPoints.map((point, index) => (
                <circle
                  key={`alert-${points[index]?.day ?? index}`}
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  className={styles.alertDot}
                />
              ))}

              {resolvedPoints.map((point, index) => (
                <circle
                  key={`resolved-${points[index]?.day ?? index}`}
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  className={styles.resolveDot}
                />
              ))}

              {points.map((point, index) => (
                <text
                  key={`label-${point.day}`}
                  x={alertPoints[index]?.x ?? chartPadding.left}
                  y={chartHeight - 18}
                  className={styles.bottomLabel}
                >
                  {point.day}
                </text>
              ))}
            </svg>

            <div className={styles.labels}>
              {points.map((point) => (
                <div key={point.day} className={styles.labelItem}>
                  <strong>{point.day}</strong>
                  <span>{point.alerts} сигналов</span>
                  <span>{point.resolved} закрыто</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
