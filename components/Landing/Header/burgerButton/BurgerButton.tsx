'use client'

import { useState, useEffect } from "react";
import styles from "./BurgerButton.module.scss"

type BurgerProps = {
  variant?: "light" | "dark";
};

export function Burger({ variant = "light" }: BurgerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleNav = () => {
        setIsOpen(!isOpen)
    }
    

    return(
        <div 
            className={styles.container} 
            data-theme={variant}
        >
            <nav onClick={toggleNav} className={styles.button}>
                <button 
                    className={`${styles.burger} ${isOpen ? styles.open : ''}`}
                    aria-label="Меню"
                    aria-expanded={isOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {isOpen && (
                <div className={styles.ul} data-theme={variant}>
                    <ul>
                        <li><a href="/login">Войти</a></li>
                        <li><a href="/">Главная</a></li>
                        <li><a href="/about">О нас</a></li>
                        <li><a href="/contacts">Контакты</a></li>
                    </ul>
                </div>
            )}
        </div>
    )
}