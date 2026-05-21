import { AlertTriangle } from "lucide-react";
import { adminPanelData } from "@/entities/admin";
import { adminShellStyles } from "@/shared/ui/admin-shell";
import { ActivityFeed } from "@/widgets/admin-widgets/admin-activity-feed";

const severityLabels = ["critical", "warning", "info"] as const;

export default function AdminAlertsPage() {
  return (
    <div className={adminShellStyles.page}>
      <section className={adminShellStyles.pageHeader}>
        <div>
          <span className={adminShellStyles.eyebrow}>
            <AlertTriangle size={14} />
            Алерты
          </span>
          <h1>Центр алертов</h1>
          <p>
            Поток критических инцидентов по backend, ML, камерам, API и безопасности.
          </p>
        </div>
      </section>

      <section className={adminShellStyles.panel}>
        <div className={adminShellStyles.panelHeader}>
          <div>
            <h2>Фильтры по серьёзности</h2>
            <p>Отмечайте как прочитанное, фильтруйте по уровню и разбирайте последние инциденты.</p>
          </div>
        </div>
        <div className={adminShellStyles.pillRow}>
          {severityLabels.map((label) => (
            <span key={label} className={adminShellStyles.pill}>
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className={adminShellStyles.panel}>
        <div className={adminShellStyles.panelHeader}>
          <div>
            <h2>Входящие алерты</h2>
            <p>Операционная очередь с реалистичными инцидентами и статусами подтверждения.</p>
          </div>
        </div>
        <ActivityFeed
          items={adminPanelData.alerts.map((alert) => ({
            id: alert.id,
            title: `${alert.title} · ${alert.severity}`,
            description: `${alert.description} Категория: ${alert.category}. Статус: ${alert.status}.`,
            time: alert.createdAt,
            tone:
              alert.severity === "critical"
                ? "critical"
                : alert.severity === "warning"
                  ? "warning"
                  : "neutral",
          }))}
        />
      </section>
    </div>
  );
}
