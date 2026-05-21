import { Activity } from "lucide-react";
import { adminPanelData } from "@/entities/admin";
import { adminShellStyles } from "@/shared/ui/admin-shell";

export default function AdminMonitoringPage() {
  return (
    <div className={adminShellStyles.page}>
      <section className={adminShellStyles.pageHeader}>
        <div>
          <span className={adminShellStyles.eyebrow}>
            <Activity size={14} />
            Мониторинг
          </span>
          <h1>Мониторинг платформы</h1>
          <p>
            DevOps-панель для наблюдения за инфраструктурой, задержками и состоянием сервисов.
          </p>
        </div>
      </section>

      <section className={adminShellStyles.gridThree}>
        {adminPanelData.monitoring.map((metric) => (
          <article key={metric.id} className={adminShellStyles.panel}>
            <div className={adminShellStyles.panelHeader}>
              <div>
                <h2>{metric.label}</h2>
                <p>Цель: {metric.target}</p>
              </div>
              <span className={adminShellStyles.miniBadge}>{metric.state}</span>
            </div>
            <div className={adminShellStyles.meterItem}>
              <strong>{metric.value}</strong>
              <span>Живой срез инфраструктуры, обновляемый из mock-операционных данных.</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
