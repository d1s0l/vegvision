import {
  DashboardHeader,
  GreenhouseStatus,
  HealthChart,
  PlantStatus,
  QuickActions,
  RecentAnalysis,
  Recommendations,
  StatsCards,
} from "@/widgets/dashboard";
import styles from "./DashboardPageContent.module.scss";

interface DashboardPageContentProps {
  analyticsHref?: string;
}

export function DashboardPageContent({
  analyticsHref = "/dashboard/analytics",
}: DashboardPageContentProps) {
  return (
    <div className={styles.page}>
      <DashboardHeader />
      <StatsCards />

      <div className={styles.mainGrid}>
        <PlantStatus />
        <RecentAnalysis analyticsHref={analyticsHref} />
      </div>

      <div className={styles.secondaryGrid}>
        <HealthChart />
        <Recommendations />
      </div>

      <div className={styles.bottomGrid}>
        <QuickActions analyticsHref={analyticsHref} />
        <GreenhouseStatus />
      </div>
    </div>
  );
}
