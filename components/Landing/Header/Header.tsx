'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import { Burger } from "./burgerButton/BurgerButton";

type HeaderProps = {
  variant?: "dark" | "light";
};

export default function Header({ variant = "light" }: HeaderProps) {

  const pathname = usePathname();

  const navItems = [
    { name: "Главная", href: "/" },
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contacts" }
  ];

  return (
    <header>
      <div className={`${styles.header} ${variant === "dark" ? styles.dark : ""}`}>
        
        <div className={styles.side}>
          <Image
            className={styles.logo}
            src={variant === "dark" ? "/logo/logo_header_dark.svg" : "/logo/logo_header_light.svg"}
            alt="Logo"
            width={60}
            height={54}
          />

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${styles.button} ${
                pathname === item.href ? styles.active : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className={styles.side}>
          <Link
            href="/login"
            className={`${styles.button} ${
              pathname === "/login" ? styles.active : ""
            }`}
          >
            Войти
          </Link>
        </div>

      </div>

      <Burger variant={variant} />
    </header>
  );
}