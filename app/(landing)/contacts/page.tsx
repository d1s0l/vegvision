import Header from "@/components/Landing/Header/Header"
import styles from "./Contacts.module.scss"
import { WorkWithUs } from "@/components/Landing/WorkWithUs/WorkWithUs"
import { Metadata } from "next"

export const metadata:Metadata ={
    title: "Контакты"
}

export default function Contacts() {
    return(
        <div >
            <Header variant="dark"/>
            <WorkWithUs />
            <div className={styles.contacts}>
                <h5>Либо свяжитесь с нами через почту или по телефону</h5>
                <address className={styles.info}>
                    <div>
                        <span>Email: </span>
                        <a href="mailto:vegvision@yandex.ru">vegvision@yandex.ru</a>
                    </div>
                    <div>
                        <span>Телефон: </span>
                        <a href="tel:+7928xxxxxx">8 (800) 555-35-35</a>
                    </div>
                </address>
            </div>
        </div>
    )
}