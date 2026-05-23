import Link from "next/link";
import {
  BarChart3,
  Download,
  FileText,
  History,
  type LucideIcon,
} from "lucide-react";
import { quickActions } from "@/shared/constants/mockData";
import styles from "./QuickActions.module.scss";

const iconMap: Record<string, LucideIcon> = {
  analytics: BarChart3,
  reports: FileText,
  history: History,
  export: Download,
};

interface QuickActionsProps {
  analyticsHref?: string;
  homeHref?: string;
}

export function QuickActions({
  analyticsHref = "/",
  homeHref = "/",
}: QuickActionsProps) {
  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <p>Быстрые действия</p>
        <h2>Короткие пути к ключевым разделам</h2>
      </div>

      <div className={styles.grid}>
        {quickActions.map((action) => {
          const Icon = iconMap[action.id];
          const href =
            action.id === "analytics" || action.id === "history"
              ? analyticsHref
              : homeHref;

          return (
            <Link key={action.id} href={href} className={styles.action}>
              <div className={styles.iconWrap}>
                <Icon size={20} />
              </div>
              <div>
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
