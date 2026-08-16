import { Metadata } from "next"
import { ScrollReveal } from "@/shared/ui/scroll-reveal"
import { LandingHeader } from "@/widgets/landing/header"
import { WorkWithUs } from "@/widgets/landing/work-with-us"
import { EmailCopyButton } from "./EmailCopyButton"
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
                    <div className={styles.cardInner}>
                        <div className={styles.cardIcon}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3 6.5C3 5.67157 3.67157 5 4.5 5H19.5C20.3284 5 21 5.67157 21 6.5V17.5C21 18.3284 20.3284 19 19.5 19H4.5C3.67157 19 3 18.3284 3 17.5V6.5Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M4 6.5L12 12.5L20 6.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <div className={styles.cardBody}>
                            <span className={styles.cardLabel}>Почта</span>
                            <address className={styles.info}>
                                <a href="mailto:vegvision@yandex.ru">vegvision@yandex.ru</a>
                            </address>
                            
                        </div>

                        <EmailCopyButton email="vegvision@yandex.ru" />
                    </div>
                </ScrollReveal>
            </section>

            <ScrollReveal as="section" className={styles.hint} direction="up" delay={120}>
                <p>
                    Отвечаем в рабочее время. Если оставите заявку ниже, мы свяжемся с вами
                    и поможем подобрать удобный формат работы.
                </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={160}>
                <WorkWithUs />
            </ScrollReveal>
        </div>
    )
}