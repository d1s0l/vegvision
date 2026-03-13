'use client'

import { useState } from "react";
import styles from "./BurgerButton.module.scss"

export function Burger() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen)
    }
    
    return(
        <div className={styles.container}>
            <nav onClick={toggleNav} className={styles.button}>
                <button className={`${styles.burger} ${isOpen ? styles.open : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {isOpen && (
                <div className={styles.ul}>
                    <ul>
                        <li><a href="/login">Войти</a></li>
                        <li><a href="/">Главная</a></li>
                        <li><a href="/">О нас</a></li>
                        <li><a href="/">Контакты</a></li>
                    </ul>
                </div>
            )}
        </div>
    )
}