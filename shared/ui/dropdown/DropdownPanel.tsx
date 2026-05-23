import type { ReactNode } from "react";
import styles from "./DropdownPanel.module.scss";

interface DropdownPanelProps {
  children: ReactNode;
  isOpen: boolean;
}

export function DropdownPanel({ children, isOpen }: DropdownPanelProps) {
  return (
    <div className={`${styles.panel} ${isOpen ? styles.open : ""}`}>
      {children}
    </div>
  );
}
