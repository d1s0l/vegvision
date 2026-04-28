import styles from "./HowWork.module.scss"
import Carousel from "./Carousel/Carousel"

export function HowWork() {
    return(
        <section className={styles.how}>
            <div>
                <h1>Как это работает?</h1>
                <ul>
                    <li>Вы подключаете камеры или загружаете изображения растений</li>
                    <li>Система автоматически анализирует состояние листьев</li>
                    <li>Алгоритмы выявляют ранние признаки заболеваний</li>
                    <li>Вы получаете рекомендации и прогноз в реальном времени</li>
                </ul>
            </div>
            <div>
                <Carousel />
            </div>
        </section>
    )
}