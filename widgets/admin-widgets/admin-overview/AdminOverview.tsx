import {
  Activity,
  Camera,
  Cpu,
  CreditCard,
  Factory,
  Globe,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { adminPanelData } from "@/entities/admin";
import { adminShellStyles } from "@/shared/ui/admin-shell";
import { StatCard } from "@/shared/ui/stat-card";
import { ActivityFeed } from "@/widgets/admin-widgets/admin-activity-feed";
import { QuickActions } from "@/widgets/admin-widgets/admin-quick-actions";
import { SystemHealth } from "@/widgets/admin-widgets/admin-system-health";

const icons = [UsersRound, CreditCard, Factory, Camera, Activity, ShieldCheck, Globe, Cpu];

export function AdminOverview() {
  return (
    <div className={adminShellStyles.page}>
      <section className={adminShellStyles.gridFour}>
        {adminPanelData.dashboardStats.map((item, index) => (
          <StatCard
            key={item.id}
            icon={icons[index] ?? Activity}
            label={item.label}
            value={item.value}
            detail={item.detail}
            trend={item.trend}
            tone={item.tone}
          />
        ))}
      </section>

      <section className={adminShellStyles.gridTwo}>
        <div className={adminShellStyles.panel}>
          <div className={adminShellStyles.panelHeader}>
            <div>
              <h2>Activity feed</h2>
              <p>Latest platform, billing and ML operations events in one stream.</p>
            </div>
            <span className={adminShellStyles.miniBadge}>Live</span>
          </div>
          <ActivityFeed items={adminPanelData.activityFeed} />
        </div>

        <div className={adminShellStyles.panel}>
          <div className={adminShellStyles.panelHeader}>
            <div>
              <h2>System health</h2>
              <p>Cross-service health checks for the admin team and incident response.</p>
            </div>
            <span className={adminShellStyles.miniBadge}>99.982%</span>
          </div>
          <SystemHealth items={adminPanelData.systemHealth} />
        </div>
      </section>

      <section className={adminShellStyles.panel}>
        <div className={adminShellStyles.panelHeader}>
          <div>
            <h2>Quick actions</h2>
            <p>Common admin workflows for platform operations, support and billing reviews.</p>
          </div>
        </div>
        <QuickActions items={adminPanelData.quickActions} />
      </section>
    </div>
  );
}
