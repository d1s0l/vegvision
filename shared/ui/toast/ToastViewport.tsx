import type { ReactNode } from "react";
import styles from "./ToastViewport.module.scss";

interface ToastViewportProps {
  children: ReactNode;
}

export function ToastViewport({ children }: ToastViewportProps) {
  return (
    <div className={styles.viewport} role="status" aria-live="polite">
      {children}
    </div>
  );
}
