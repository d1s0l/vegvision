import Image from "next/image";
import { Camera, CloudRain, Eye, Thermometer, Waves } from "lucide-react";
import { greenhouseStatuses } from "@/shared/constants/mockData";
import styles from "./GreenhouseStatus.module.scss";

const metricIconMap = {
  "Температура": Thermometer,
  "Влажность": Waves,
  "Осадки": CloudRain,
} as const;

export function GreenhouseStatus() {
  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <div>
          <p>Состояние теплиц</p>
          <h2>Онлайн-мониторинг климатических условий</h2>
        </div>
        <span className={styles.live}>
          <Eye size={16} />
          Live stream
        </span>
      </div>

      <div className={styles.list}>
        {greenhouseStatuses.map((greenhouse) => (
          <article key={greenhouse.id} className={styles.item}>
            <div className={styles.preview}>
              <Image
                src={greenhouse.image}
                alt={greenhouse.name}
                width={140}
                height={104}
              />
            </div>

            <div className={styles.body}>
              <div className={styles.top}>
                <div>
                  <h3>{greenhouse.name}</h3>
                  <p>{greenhouse.status}</p>
                </div>

                <div className={styles.badges}>
                  <span className={styles.cameraBadge}>
                    <Camera size={14} />
                    {greenhouse.cameraStatus}
                  </span>
                  <span className={styles.monitoringBadge}>
                    {greenhouse.monitoringState}
                  </span>
                </div>
              </div>

              <div className={styles.metrics}>
                {greenhouse.metrics.map((metric) => {
                  const Icon = metricIconMap[metric.label as keyof typeof metricIconMap];

                  return (
                    <div key={metric.label} className={styles.metric}>
                      <span>
                        <Icon size={15} />
                        {metric.label}
                      </span>
                      <strong>{metric.value}</strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
