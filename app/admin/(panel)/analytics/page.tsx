import { BarChart3 } from "lucide-react";
import { adminPanelData } from "@/entities/admin";
import { adminShellStyles } from "@/shared/ui/admin-shell";
import { StatCard } from "@/shared/ui/stat-card";

export default function AdminAnalyticsPage() {
  return (
    <div className={adminShellStyles.page}>
      <section className={adminShellStyles.pageHeader}>
        <div>
          <span className={adminShellStyles.eyebrow}>
            <BarChart3 size={14} />
            Продуктовая аналитика
          </span>
          <h1>Аналитика роста SaaS</h1>
          <p>Отслеживание внедрения платформы, retention, API usage и самых активных клиентов.</p>
        </div>
      </section>

      <section className={adminShellStyles.gridFour}>
        {adminPanelData.productMetrics.map((item) => (
          <StatCard
            key={item.id}
            icon={BarChart3}
            label={item.label}
            value={item.value}
            detail={item.detail}
            trend="Обновляется каждый час"
          />
        ))}
      </section>

      <section className={adminShellStyles.panel}>
        <div className={adminShellStyles.panelHeader}>
          <div>
            <h2>Топ клиентов по использованию</h2>
            <p>Аккаунты с самым высоким объёмом запросов и операционной активностью.</p>
          </div>
        </div>
        <div className={adminShellStyles.meterList}>
          {adminPanelData.topClients.map((client) => (
            <article key={client.id} className={adminShellStyles.meterItem}>
              <strong>{client.company}</strong>
              <span>{client.requests} API-запросов · {client.seats} внутренних мест</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
