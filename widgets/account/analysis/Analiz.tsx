import { AnalysisRow, recentAnalyses } from "@/entities/analysis";
import styles from "./Analiz.module.scss"


export function Analiz(){
    return(
        <section className={styles.analiz}>
            <div className={styles.head}>
                <h3>Недавние анализы</h3>
                <a href="/a">Все анализы</a>
            </div>
            {recentAnalyses.map((analysis) => (
                <AnalysisRow key={analysis.id} analysis={analysis} />
            ))}

        </section>
    )
}
