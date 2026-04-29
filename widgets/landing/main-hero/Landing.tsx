import Image from "next/image";
import styles from "./Landing.module.scss";
import { ScrollButton } from "@/features/landing/scroll-to-section";
import { LandingAbout } from "@/widgets/landing/about";
import { LandingHowWork } from "@/widgets/landing/how-work";
import { WorkWithUs } from "@/widgets/landing/work-with-us";
import { ScrollReveal } from "@/shared/ui/scroll-reveal";

export default function Landing() {
    return (
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
                    
                    <ScrollButton 
                        targetId="about-section"
                        className={styles.button}
                    >
                        Подробнее
                    </ScrollButton>
                </div>
            </section>

            <div id="about-section">
                <div className={styles.sections}>
                    <ScrollReveal direction="up">
                        <LandingAbout />
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={120}>
                        <LandingHowWork />
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={180}>
                        <WorkWithUs />
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
}
