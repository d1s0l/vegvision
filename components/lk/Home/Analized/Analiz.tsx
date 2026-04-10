import { Stroke } from "./stroke/Stroke";
import styles from "./Analiz.module.scss"


export function Analiz(){
    return(
        <section className={styles.analiz}>
            <div className={styles.head}>
                <h3>Недавние анализы</h3>
                <a href="/a">Все анализы</a>
            </div>
            <Stroke image="/lk/camera-icon.svg" name="Томаты" place="Теплица 1" date="14.02.2026" status="Good"/>
            <Stroke image="/lk/camera-icon.svg" name="Томаты" place="Теплица 1" date="14.02.2026" status="Risk"/>
            <Stroke image="/lk/camera-icon.svg" name="Томаты" place="Теплица 1" date="14.02.2026" status="Problem"/>

        </section>
    )
}