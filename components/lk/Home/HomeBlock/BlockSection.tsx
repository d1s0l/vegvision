import { HomeBlock } from "./block/HomeBLock";
import styles from "./BlockSection.module.scss"

export function BlockSection() {
    return(
        <section className={styles.block}>
            <div className={styles.grid}>
                <HomeBlock image="/lk/shield-icon.svg" h1="Обнаружено проблем" data="20"/>
                <HomeBlock image="/lk/pulse-icon.svg" h1="Активные анализы" data="5"/>
                <HomeBlock image="/lk/camera-icon.svg" h1="Камеры в теплицах" data="15"/>
                <HomeBlock image="/lk/camera-icon.svg" h1="Камеры в теплицах" data="15"/>
            </div>
        </section>
    )
}