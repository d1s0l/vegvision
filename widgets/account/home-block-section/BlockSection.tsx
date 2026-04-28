import { dashboardSummary, SummaryCard } from "@/entities/dashboard";
import styles from "./BlockSection.module.scss"

export function BlockSection() {
    return(
        <section className={styles.block}>
            <div className={styles.grid}>
                {dashboardSummary.map((item) => (
                    <SummaryCard
                        key={item.id}
                        icon={item.icon}
                        title={item.title}
                        value={item.value}
                    />
                ))}
            </div>
        </section>
    )
}
