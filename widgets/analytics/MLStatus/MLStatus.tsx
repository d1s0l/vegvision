import { Cpu, Gauge, RefreshCcw } from "lucide-react";
import type { MlSystemStatus } from "@/entities/analytics";
import styles from "./MLStatus.module.scss";

interface MLStatusProps {
  status: MlSystemStatus;
}

export function MLStatus({ status }: MLStatusProps) {
  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <p>{status.title}</p>
        <h2>Производительность системы и доставка данных с backend</h2>
      </div>

      <div className={styles.stateCard}>
        <div className={styles.stateTop}>
          <span className={`${styles.stateBadge} ${styles[status.stateTone]}`}>
            <Cpu size={16} />
            {status.state}
          </span>
          <span className={styles.update}>
            <RefreshCcw size={14} />
            {status.lastUpdate}
          </span>
        </div>

        <p>{status.description}</p>
      </div>

      <div className={styles.metrics}>
        {status.metrics.map((metric) => (
          <article key={metric.id} className={styles.metric}>
            <span>
              <Gauge size={15} />
              {metric.label}
            </span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
