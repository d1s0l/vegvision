'use client'

import { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.scss"
import Link from "next/link";

export default function Header() {
  const [active, setActive] = useState("Главная");

  const navItems = ["Главная", "О нас", "Контакты"];

  return (
    <header className={styles.header}>
        <div className={styles.side}>
            <Image
                className={styles.logo}
                src="./logo/logo_header.svg"
                alt="Logo"
                width={60}
                height={54}
            />
            {navItems.map((item) => (
                <button 
                    key={item}
                    className={`${styles.button} ${active === item ? styles.active : ''}`}
                    onClick={() => setActive(item)}
                >
                    {item}
                </button>
            ))}
        </div>
        <div className={styles.side}>
            <Link href="/login">
                <button
                    className={`${styles.button} ${active === "Войти" ? styles.active : ''}`}
                    onClick={() => setActive("Войти")}
                >
                    Войти
                </button>
            </Link>
        </div>
    </header>
  );
}