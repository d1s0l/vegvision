import { CreditCard } from "lucide-react";
import { adminPanelData } from "@/entities/admin";
import { adminShellStyles } from "@/shared/ui/admin-shell";
import { StatCard } from "@/shared/ui/stat-card";
import styles from "./page.module.scss";

const revenueFillClassMap = {
  Янв: styles.fillJan,
  Фев: styles.fillFeb,
  Мар: styles.fillMar,
  Апр: styles.fillApr,
  Май: styles.fillMay,
} as const;

export default function AdminBillingPage() {
  return (
    <div className={adminShellStyles.page}>
      <section className={adminShellStyles.pageHeader}>
        <div>
          <span className={adminShellStyles.eyebrow}>
            <CreditCard size={14} />
            Биллинг
          </span>
          <h1>Выручка и подписки</h1>
          <p>MRR, конверсия, инвойсы и надёжность платежей по всей платформе.</p>
        </div>
      </section>

      <section className={adminShellStyles.gridFour}>
        {adminPanelData.billingMetrics.map((item) => (
          <StatCard
            key={item.id}
            icon={CreditCard}
            label={item.label}
            value={item.value}
            detail={item.detail}
            trend={item.trend}
          />
        ))}
      </section>

      <section className={adminShellStyles.panel}>
        <div className={adminShellStyles.panelHeader}>
          <div>
            <h2>График выручки</h2>
            <p>Динамика ежемесячной выручки и количества инвойсов на реалистичных mock-данных.</p>
          </div>
        </div>
        <div className={adminShellStyles.meterList}>
          {adminPanelData.revenue.map((point) => (
            <article key={point.month} className={adminShellStyles.meterItem}>
              <strong>{point.month} · ${point.revenue}k MRR</strong>
              <span>{point.invoices} выставленных инвойсов</span>
              <div className={adminShellStyles.progressTrack}>
                <span
                  className={`${adminShellStyles.progressFill} ${
                    revenueFillClassMap[point.month as keyof typeof revenueFillClassMap]
                  }`}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
