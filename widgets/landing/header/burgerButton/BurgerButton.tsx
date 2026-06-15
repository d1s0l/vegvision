"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./BurgerButton.module.scss"

type BurgerProps = {
  variant?: "light" | "dark";
};

export function Burger({ variant = "light" }: BurgerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: "Войти", href: "/login" },
        { name: "Главная", href: "/" },
        { name: "О нас", href: "/about" },
        { name: "Контакты", href: "/contacts" },
    ];

    const toggleNav = () => {
        setIsOpen((prev) => !prev)
    }

    return(
        <div
            className={styles.container}
            data-theme={variant}
        >
            <nav onClick={toggleNav} className={styles.button}>
                <button
                    className={`${styles.burger} ${isOpen ? styles.open : ""}`}
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
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={isActive ? styles.activeLink : ""}
                                        aria-current={isActive ? "page" : undefined}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}
