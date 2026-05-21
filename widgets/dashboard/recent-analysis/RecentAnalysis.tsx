import Image from "next/image";
import Link from "next/link";
import { Camera, Clock3, MapPinned } from "lucide-react";
import { recentAnalyses } from "@/shared/constants/mockData";
import styles from "./RecentAnalysis.module.scss";

const statusMap = {
  healthy: "Стабильно",
  attention: "Нужно внимание",
  critical: "Критично",
} as const;

interface RecentAnalysisProps {
  analyticsHref?: string;
}

export function RecentAnalysis({
  analyticsHref = "/dashboard/analytics",
}: RecentAnalysisProps) {
  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <div>
          <p>Недавние анализы</p>
          <h2>Последние события от ML-системы</h2>
        </div>
        <Link href={analyticsHref} className={styles.link}>
          Все анализы
        </Link>
      </div>
      
      <div className={styles.line}></div>

      <div className={styles.list}>
        {recentAnalyses.map((analysis) => (
          <article key={analysis.id} className={styles.item}>
            <div className={styles.thumb}>
              <Image
                src={analysis.image}
                alt={analysis.plantName}
                width={72}
                height={72}
              />
            </div>

            <div className={styles.main}>
              <div className={styles.mainTop}>
                <div>
                  <h3>{analysis.plantName}</h3>
                  <p>{analysis.diagnosis}</p>
                </div>
                <span
                  className={`${styles.status} ${styles[analysis.status]}`}
                >
                  {statusMap[analysis.status]}
                </span>
              </div>
              <dl className={styles.meta}>
                <div>
                  <dt>
                    <MapPinned size={15} />
                    Теплица
                  </dt>
                  <dd>{analysis.greenhouse}</dd>
                </div>
                <div>
                  <dt>
                    <Clock3 size={15} />
                    Время
                  </dt>
                  <dd>{analysis.analysedAt}</dd>
                </div>
                <div>
                  <dt>
                    <Camera size={15} />
                    Поток
                  </dt>
                  <dd>Автоанализ камеры</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
        
      </div>
    </section>
  );
}
