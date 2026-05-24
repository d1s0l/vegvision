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
  homeHref?: string;
}

export function DashboardPageContent({
  analyticsHref = "/",
  homeHref = "/",
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
        {/* <QuickActions analyticsHref={analyticsHref} homeHref={homeHref} /> */}
        <GreenhouseStatus />
      </div>
    </div>
  );
}
