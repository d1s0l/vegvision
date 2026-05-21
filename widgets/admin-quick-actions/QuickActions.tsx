import Link from "next/link";
import type { QuickActionItem } from "@/entities/admin";
import styles from "./QuickActions.module.scss";

interface QuickActionsProps {
  items: QuickActionItem[];
}

export function QuickActions({ items }: QuickActionsProps) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <Link key={item.id} href={item.href} className={styles.card}>
          <strong>{item.title}</strong>
          <p>{item.description}</p>
        </Link>
      ))}
    </div>
  );
}
