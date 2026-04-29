import { Metadata } from "next"
import { ScrollReveal } from "@/shared/ui/scroll-reveal"
import { LandingHeader } from "@/widgets/landing/header"
import styles from "./About.module.scss"

export const metadata: Metadata = {
    title: "О нас",
}

export default function About() {
    return (
        <div className={styles.container}>
            <LandingHeader variant="dark" />

            <ScrollReveal as="section" className={styles.hero} direction="right" delay={180}>
                <div className={styles.heroBadge}>О проекте</div>
                <h1>О нас</h1>
                <h3>
                    VegVision родился из конкретной проблемы агробизнеса. Мы увидели разрыв между
                    технологиями и реальностью теплиц и создали мост, чтобы его закрыть.
                </h3>
            </ScrollReveal>

            <section className={styles.textBlock}>
                <div className={styles.grid}>
                    <ScrollReveal as="article" className={styles.card} direction="up">
                        <h5>Чем мы занимаемся?</h5>
                        <span>
                            Мы разрабатываем цифровые инструменты для диагностики заболеваний растений с
                            использованием технологий компьютерного зрения и искусственного интеллекта.
                            Система анализирует изображения листьев и помогает выявлять первые признаки
                            заболеваний на ранней стадии, чтобы на проблему можно было реагировать быстрее.
                        </span>
                    </ScrollReveal>

                    <ScrollReveal as="article" className={styles.card} direction="up" delay={80}>
                        <h5>Наше решение</h5>
                        <span>
                            VegVision — это система автоматического мониторинга состояния растений.
                            Алгоритмы анализируют изображения, обнаруживают отклонения и помогают
                            определить возможные заболевания. Платформа может работать круглосуточно
                            и встраиваться в уже существующую инфраструктуру.
                        </span>
                    </ScrollReveal>

                    <ScrollReveal className={styles.imageCard} direction="up" delay={140}>
                        <img src="./tomato-leaf.png" alt="Лист томата" />
                    </ScrollReveal>

                    <ScrollReveal as="article" className={styles.card} direction="up" delay={200}>
                        <h5>Наш подход</h5>
                        <span>
                            Мы объединяем современные технологии машинного обучения, анализ изображений
                            и практические задачи агробизнеса. Наша цель — создать простую и понятную
                            систему, которая помогает принимать решения на основе данных и облегчает
                            контроль за состоянием растений.
                        </span>
                    </ScrollReveal>

                    <ScrollReveal as="article" className={styles.card} direction="up" delay={260}>
                        <h5>Наша команда</h5>
                        <span>
                            Мы команда разработчиков, объединённых интересом к технологиям и сельскому
                            хозяйству. В проекте применяем знания в программировании, анализе данных
                            и искусственном интеллекте, чтобы создавать решения, полезные в реальных
                            условиях.
                        </span>
                    </ScrollReveal>
                </div>

                <ScrollReveal as="section" className={styles.note} direction="up" delay={160}>
                    <p>
                        Мы строим понятный инструмент для теплиц и хозяйств, который помогает раньше
                        замечать риски и принимать решения быстрее.
                    </p>
                </ScrollReveal>
            </section>
        </div>
    )
}
