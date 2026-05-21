import { BarChart3 } from "lucide-react";
import { adminShellStyles } from "@/shared/ui/admin-shell";
import { AdminOverview } from "@/widgets/admin-widgets/admin-overview";

export default function AdminDashboardPage() {
  return (
    <div className={adminShellStyles.page}>
      <section className={adminShellStyles.pageHeader}>
        <div>
          <span className={adminShellStyles.eyebrow}>
            <BarChart3 size={14} />
            Обзор платформы
          </span>
          <h1>Админи панель VegVision</h1>
          <p>
            Единый центр управления ростом платформы, состоянием системы, биллингом и ML-операциями.
          </p>
        </div>
      </section>

      <AdminOverview />
    </div>
  );
}
