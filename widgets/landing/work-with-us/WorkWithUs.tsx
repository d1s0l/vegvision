//исправить ввода телефона

'use client'

import styles from "./WorkWithUs.module.scss"
import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber } from "react-phone-number-input/input"
import { useState } from 'react'

export function WorkWithUs() {
    const [value, setValue] = useState<string | undefined>('')


 
    return (
        <section className={styles.container}>
        <div>
            <h1>Работа с нами</h1>
            <h5>Заполните заявку на работу с нами</h5>
        </div>
        <div>
            <span>Контактные данные</span>
            <form >
                <div className={styles.formGrid}>
                    <input type="text" placeholder="Имя" />
                    <input type="text" placeholder="Компания" />
                    <input type="email" placeholder="Email" />
                    <PhoneInput
                        className={styles.phoneInput}
                        country="RU"
                        value={value}
                        onChange={setValue}
                        placeholder="Телефон"
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.buttonWrapper} type="submit">
                        Отправить
                    </button>            
                </div>
            </form>
        </div>
        </section>
    )
}