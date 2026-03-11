import styles from "./WorkWithUs.module.scss"

export function WorkWithUs() {
    return(
        <section className={styles.continer}>
            <div>
                <h1>Работа с нами</h1>
                <h5>Заполните заявку на работу с нами</h5>
            </div>
            <div>
                <span>Контактные данные</span>
                <div className={styles.input}>
                    <input type="text" placeholder="Имя"/>
                    <input type="text" placeholder="Комания"/>
                    <input type="Email"placeholder="Email" />
                    <input type="number" placeholder="Телефон"/>
                </div>
                <div className={styles.button}>
                    <button type="submit">Отправить</button>
                </div>
            </div>
        </section>
    )
}