import { NotificationProvider } from "@/entities/notification";
import { NotificationToast } from "@/features/toast-notification";
import { UserAuthGuard, UserAuthProvider } from "@/features/user-auth";
import { privatePageMetadata } from "@/shared/lib/seo";
import { Sidebar } from "@/widgets/account/sidebar";
import styles from "./LkLayout.module.scss";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const metadata = privatePageMetadata;

export default function LkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserAuthProvider>
      <UserAuthGuard>
        <NotificationProvider>
          <div className={styles.layout}>
            <Sidebar />
            <main className={styles.content}>{children}</main>
            <NotificationToast />
          </div>
        </NotificationProvider>
      </UserAuthGuard>
    </UserAuthProvider>
  );
}
