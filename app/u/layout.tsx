import { Sidebar } from "@/widgets/account/sidebar";
import styles from "./LkLayout.module.scss";

export default function LkLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.content}>
                {children}
            </main>
        </div>
    )
}
