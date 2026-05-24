import {
  Activity,
  AlertTriangle,
  Leaf,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { dashboardStats, type DashboardStatId } from "@/shared/constants/mockData";
import styles from "./StatsCards.module.scss";

const iconMap: Record<DashboardStatId, LucideIcon> = {
  plants: Leaf,
  "active-analyses": Activity,
  issues: AlertTriangle,
  accuracy: ShieldCheck,
};

export function StatsCards() {
  return (
    <section className={styles.section} aria-label="Ключевая статистика">
      {dashboardStats.map((stat) => {
        const Icon = iconMap[stat.id] ?? Activity;

        return (
          <article key={stat.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.iconWrap}>
                <Icon size={22} />
              </div>
              <span className={styles.trend}>{stat.trend}</span>
            </div>

            <div className={styles.cardBody}>
              <p>{stat.title}</p>
              <strong>{stat.value}</strong>
              <span>{stat.detail}</span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
