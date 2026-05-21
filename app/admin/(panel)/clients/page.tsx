import { Building2 } from "lucide-react";
import { adminPanelData } from "@/entities/admin";
import type { ClientSummary } from "@/entities/client";
import { adminShellStyles } from "@/shared/ui/admin-shell";
import { AdminDataTable, type AdminTableColumn } from "@/widgets/admin-data-table";

const columns: AdminTableColumn<ClientSummary>[] = [
  { id: "company", header: "Компания", render: (row) => row.companyName },
  { id: "plan", header: "Тариф", render: (row) => row.plan },
  { id: "status", header: "Статус", render: (row) => row.subscriptionStatus },
  { id: "greenhouses", header: "Теплицы", render: (row) => row.greenhouseCount },
  { id: "cameras", header: "Камеры", render: (row) => row.cameraCount },
  { id: "date", header: "Регистрация", render: (row) => row.registrationDate },
  { id: "activity", header: "Активность", render: (row) => row.lastActivity },
  {
    id: "actions",
    header: "Действия",
    render: () => "Открыть · Сменить тариф · Заблокировать · Удалить",
  },
];

export default function AdminClientsPage() {
  return (
    <div className={adminShellStyles.page}>
      <section className={adminShellStyles.pageHeader}>
        <div>
          <span className={adminShellStyles.eyebrow}>
            <Building2 size={14} />
            Клиенты
          </span>
          <h1>Клиентский портфель</h1>
          <p>
            Управление тарифами, теплицами, парком камер и состоянием подписок клиентов.
          </p>
        </div>
      </section>

      <section className={adminShellStyles.panel}>
        <div className={adminShellStyles.panelHeader}>
          <div>
            <h2>Таблица аккаунтов</h2>
            <p>Операционный вид для поддержки, расширения продаж и контроля жизненного цикла клиента.</p>
          </div>
          <span className={adminShellStyles.miniBadge}>{adminPanelData.clients.length} клиентов</span>
        </div>
        <AdminDataTable columns={columns} rows={adminPanelData.clients} />
      </section>
    </div>
  );
}
