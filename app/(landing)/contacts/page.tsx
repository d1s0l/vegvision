import { LandingHeader } from "@/widgets/landing/header"
import styles from "./Contacts.module.scss"
import { WorkWithUs } from "@/widgets/landing/work-with-us"
import { Metadata } from "next"

export const metadata:Metadata ={
    title: "Контакты"
}

export default function Contacts() {
    return(
        <div className={styles.page}>
            <LandingHeader variant="dark"/>
            <section className={styles.hero}>
                <div className={styles.badge}>Контакты</div>
                <h1>Свяжитесь с нами</h1>
                <p>Если хотите обсудить внедрение, задать вопрос по проекту или договориться о сотрудничестве, напишите нам любым удобным способом.</p>
            </section>
            <section className={styles.contacts}>
                <div className={styles.card}>
                    <h5>Почта</h5>
                    <address className={styles.info}>
                        <a href="mailto:vegvision@yandex.ru">vegvision@yandex.ru</a>
                    </address>
                </div>
                <div className={styles.card}>
                    <h5>Телефон</h5>
                    <address className={styles.info}>
                        <a href="tel:+7928xxxxxx">8 (800) 555-35-35</a>
                    </address>
                </div>
            </section>
            <section className={styles.hint}>
                <p>Обычно отвечаем в рабочее время. Если оставите заявку ниже, мы свяжемся с вами и поможем подобрать удобный формат работы.</p>
            </section>
            <WorkWithUs />
        </div>
    )
}
