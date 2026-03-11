import Image from "next/image"
import styles from "./Landing.module.scss"
import { About } from "./About/About"
import { HowWork } from "./HowWork/HowWork"
import { WorkWithUs } from "./WorkWithUs/WorkWithUs"

export default function Landing() {
    return(
        <div>
            <Image 
                src='/background.svg'
                alt="Background"
                fill
                priority
                quality={100}
                style={{
                    objectFit: 'cover',
                    zIndex: -1,
                }}
                className={styles.image}
            />
            <section className={styles.content}>
                <div className={styles.textblock}>
                    <h3>AI-помощник</h3>
                    <h1>VegVision</h1>
                    <p>Поможем предотвратить до 20% <br/>
                    потерь урожая</p>
                    <button>
                        Подробнее
                    </button>
                </div>
            </section>

            <About />
            
            <HowWork />
            <WorkWithUs />
        </div>
    )
}