import styles from "./HowWork.module.scss"
import Carousel from "./Carousel/Carousel"

export function HowWork() {
    return(
        <section className={styles.how}>
            <div>
                <h1>Как это работает?</h1>
                <p>nfdkslfds <br />dslkaj;dlskbr <br />dpsaipdsa</p>
            </div>
            <div>
                <Carousel />
            </div>
        </section>
    )
}