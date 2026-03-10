import styles from "./HowWork.module.css"

export function HowWork() {
    return(
        <section className={styles.how}>
            <div>
                <h1>Как это работает?</h1>
                <p>nfdkslfds <br />dslkaj;dlskbr <br />dpsaipdsa</p>
            </div>
            <div>
                <div className={styles.rectangle}></div>
                <div></div>
            </div>
        </section>
    )
}