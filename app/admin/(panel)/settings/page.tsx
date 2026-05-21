import { Settings } from "lucide-react";
import { adminPanelData } from "@/entities/admin";
import { adminShellStyles } from "@/shared/ui/admin-shell";

export default function AdminSettingsPage() {
  return (
    <div className={adminShellStyles.page}>
      <section className={adminShellStyles.pageHeader}>
        <div>
          <span className={adminShellStyles.eyebrow}>
            <Settings size={14} />
            Настройки
          </span>
          <h1>Настройки платформы</h1>
          <p>ML-пороги, уведомления, интеграции и настройки безопасности для всей платформы.</p>
        </div>
      </section>

      <section className={adminShellStyles.gridThree}>
        {adminPanelData.settings.map((section) => (
          <article key={section.id} className={adminShellStyles.panel}>
            <div className={adminShellStyles.panelHeader}>
              <div>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>
            </div>
            <div className={adminShellStyles.meterList}>
              {section.items.map((item) => (
                <div key={item.id} className={adminShellStyles.meterItem}>
                  <strong>{item.label}: {item.value}</strong>
                  <span>{item.hint}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
