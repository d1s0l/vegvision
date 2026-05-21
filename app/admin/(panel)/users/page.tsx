import { Users } from "lucide-react";
import { adminPanelData } from "@/entities/admin";
import type { InternalUserRow } from "@/entities/admin";
import { adminShellStyles } from "@/shared/ui/admin-shell";
import { AdminDataTable, type AdminTableColumn } from "@/widgets/admin-data-table";

const columns: AdminTableColumn<InternalUserRow>[] = [
  { id: "name", header: "Имя", render: (row) => row.name },
  { id: "role", header: "Роль", render: (row) => row.role },
  { id: "permissions", header: "Права", render: (row) => row.permissions },
  { id: "session", header: "Сессии", render: (row) => row.session },
  { id: "activity", header: "Активность", render: (row) => row.activity },
];

export default function AdminUsersPage() {
  return (
    <div className={adminShellStyles.page}>
      <section className={adminShellStyles.pageHeader}>
        <div>
          <span className={adminShellStyles.eyebrow}>
            <Users size={14} />
            Внутренние пользователи
          </span>
          <h1>Доступ команды администрирования</h1>
          <p>Роли, права, активные сессии и действия операторов внутри компании.</p>
        </div>
      </section>

      <section className={adminShellStyles.panel}>
        <div className={adminShellStyles.panelHeader}>
          <div>
            <h2>Команда</h2>
            <p>Матрица доступа для владельцев, поддержки, ops-команды и ML-администраторов.</p>
          </div>
        </div>
        <AdminDataTable columns={columns} rows={adminPanelData.internalUsers} />
      </section>
    </div>
  );
}
