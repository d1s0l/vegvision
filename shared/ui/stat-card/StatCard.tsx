import type { LucideIcon } from "lucide-react";
import styles from "./StatCard.module.scss";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
  trend: string;
  tone?: "neutral" | "good" | "warning";
}

export function StatCard({
  icon: Icon,
  label,
  value,
  detail,
  trend,
  tone = "neutral",
}: StatCardProps) {
  return (
    <article className={`${styles.card} ${styles[tone]}`}>
      <div className={styles.iconWrap}>
        <Icon size={18} />
      </div>
      <div className={styles.copy}>
        <span>{label}</span>
        <strong>{value}</strong>
        <p>{detail}</p>
      </div>
      <small>{trend}</small>
    </article>
  );
}
