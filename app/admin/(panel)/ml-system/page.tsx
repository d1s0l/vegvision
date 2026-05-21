import { Sparkles } from "lucide-react";
import { adminPanelData } from "@/entities/admin";
import { adminShellStyles } from "@/shared/ui/admin-shell";

export default function AdminMlSystemPage() {
  return (
    <div className={adminShellStyles.page}>
      <section className={adminShellStyles.pageHeader}>
        <div>
          <span className={adminShellStyles.eyebrow}>
            <Sparkles size={14} />
            ML-система
          </span>
          <h1>Контроль моделей и инференса</h1>
          <p>
            Наблюдение за выкладкой моделей, очередью инференса, загрузкой GPU и готовностью к retrain.
          </p>
        </div>
      </section>

      <section className={adminShellStyles.gridThree}>
        {adminPanelData.mlMetrics.map((metric) => (
          <article key={metric.id} className={adminShellStyles.panel}>
            <div className={adminShellStyles.panelHeader}>
              <div>
                <h2>{metric.label}</h2>
                <p>{metric.detail}</p>
              </div>
              <span className={adminShellStyles.miniBadge}>{metric.tone}</span>
            </div>
            <div className={adminShellStyles.meterItem}>
              <strong>{metric.value}</strong>
              <span>Готовый каркас для живых метрик наблюдаемости ML-системы.</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
