import { Metadata } from "next"
import { ScrollReveal } from "@/shared/ui/scroll-reveal"
import { LandingHeader } from "@/widgets/landing/header"
import { WorkWithUs } from "@/widgets/landing/work-with-us"
import styles from "./Contacts.module.scss"

export const metadata: Metadata = {
    title: "Контакты",
    description:
        "Свяжитесь с командой VegVision, чтобы обсудить внедрение системы мониторинга состояния растений.",
    alternates: {
        canonical: "/contacts",
    },
    openGraph: {
        title: "Контакты | VegVision",
        description:
            "Оставьте заявку или напишите команде VegVision, чтобы обсудить сотрудничество и внедрение.",
        url: "/contacts",
    },
}

export default function Contacts() {
    return (
        <div className={styles.page}>
            <LandingHeader variant="dark" />

            <ScrollReveal as="section" className={styles.hero} direction="right" delay={180}>
                <div className={styles.badge}>Контакты</div>
                <h1>Свяжитесь с нами</h1>
                <p>
                    Если хотите обсудить внедрение, задать вопрос по проекту или договориться
                    о сотрудничестве, напишите нам любым удобным способом.
                </p>
            </ScrollReveal>

            <section className={styles.contacts}>
                <ScrollReveal className={styles.card} direction="up">
                    <h5>Почта</h5>
                    <address className={styles.info}>
                        <a href="mailto:vegvision@yandex.ru">vegvision@yandex.ru</a>
                    </address>
                </ScrollReveal>

                <ScrollReveal className={styles.card} direction="up" delay={100}>
                    <h5>Телефон</h5>
                    <address className={styles.info}>
                        <a href="tel:+78005553535">8 (800) 555-35-35</a>
                    </address>
                </ScrollReveal>
            </section>

            <ScrollReveal as="section" className={styles.hint} direction="up" delay={120}>
                <p>
                    Обычно отвечаем в рабочее время. Если оставите заявку ниже, мы свяжемся с вами
                    и поможем подобрать удобный формат работы.
                </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={160}>
                <WorkWithUs />
            </ScrollReveal>
        </div>
    )
}
