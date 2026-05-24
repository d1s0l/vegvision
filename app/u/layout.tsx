import { NotificationProvider } from "@/entities/notification";
import { NotificationToast } from "@/features/toast-notification";
import { Sidebar } from "@/widgets/account/sidebar";
import styles from "./LkLayout.module.scss";

export const revalidate = 60;

export default function LkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NotificationProvider>
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.content}>{children}</main>
        <NotificationToast />
      </div>
    </NotificationProvider>
  );
}
