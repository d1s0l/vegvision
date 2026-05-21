import { Logs } from "lucide-react";
import { adminPanelData } from "@/entities/admin";
import type { LogEntry } from "@/entities/admin";
import { adminShellStyles } from "@/shared/ui/admin-shell";
import { AdminDataTable, type AdminTableColumn } from "@/widgets/admin-data-table";

const columns: AdminTableColumn<LogEntry>[] = [
  { id: "source", header: "Источник", render: (row) => row.source },
  { id: "level", header: "Уровень", render: (row) => row.level },
  { id: "message", header: "Сообщение", render: (row) => row.message },
  { id: "timestamp", header: "Время", render: (row) => row.timestamp },
  { id: "actor", header: "Инициатор", render: (row) => row.actor },
];

export default function AdminLogsPage() {
  return (
    <div className={adminShellStyles.page}>
      <section className={adminShellStyles.pageHeader}>
        <div>
          <span className={adminShellStyles.eyebrow}>
            <Logs size={14} />
            Логи
          </span>
          <h1>Просмотр системных логов</h1>
          <p>Единый обзор auth, API, error, ML и audit логов в enterprise-формате.</p>
        </div>
      </section>

      <section className={adminShellStyles.panel}>
        <div className={adminShellStyles.panelHeader}>
          <div>
            <h2>Последние события</h2>
            <p>Готовый каркас для потоковых логов и продвинутой фильтрации.</p>
          </div>
        </div>
        <AdminDataTable columns={columns} rows={adminPanelData.logs} />
      </section>
    </div>
  );
}
