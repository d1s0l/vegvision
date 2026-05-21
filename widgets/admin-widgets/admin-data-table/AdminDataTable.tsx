import type { ReactNode } from "react";
import styles from "./AdminDataTable.module.scss";

export interface AdminTableColumn<Row> {
  id: string;
  header: string;
  render: (row: Row) => ReactNode;
}

interface AdminDataTableProps<Row> {
  columns: AdminTableColumn<Row>[];
  rows: Row[];
}

export function AdminDataTable<Row>({
  columns,
  rows,
}: AdminDataTableProps<Row>) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.id}>{column.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
