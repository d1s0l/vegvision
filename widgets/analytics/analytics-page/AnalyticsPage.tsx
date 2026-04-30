import { analyticsPageData } from "@/entities/analytics";
import { AIInsights } from "../AIInsights/AIInsights";
import { ActivityTimeline } from "../ActivityTimeline/ActivityTimeline";
import { AnalyticsHeader } from "../AnalyticsHeader/AnalyticsHeader";
import { ComparisonSection } from "../ComparisonSection/ComparisonSection";
import { DiseaseAnalytics } from "../DiseaseAnalytics/DiseaseAnalytics";
import { Heatmap } from "../Heatmap/Heatmap";
import { KPISection } from "../KPISection/KPISection";
import { MainChart } from "../MainChart/MainChart";
import { MLStatus } from "../MLStatus/MLStatus";
import styles from "./AnalyticsPage.module.scss";

export function AnalyticsPage() {
  const data = analyticsPageData;

  return (
    <div className={styles.page}>
      <AnalyticsHeader
        periodOptions={data.periodOptions}
        greenhouseOptions={data.greenhouseOptions}
        cropOptions={data.cropOptions}
      />

      <KPISection items={data.kpis} />

      <div className={styles.primaryGrid}>
        <MainChart points={data.trend} />
        <MLStatus status={data.mlStatus} />
      </div>

      <div className={styles.secondaryGrid}>
        <Heatmap rows={data.heatmap} />
        <DiseaseAnalytics items={data.diseases} />
      </div>

      <div className={styles.tertiaryGrid}>
        <AIInsights items={data.insights} />
        <ComparisonSection items={data.comparison} />
      </div>

      <ActivityTimeline items={data.activity} />
    </div>
  );
}
