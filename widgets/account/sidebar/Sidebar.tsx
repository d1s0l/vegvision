'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { LinksPart } from "./LinksPart/Links";
import styles from "./Sidebar.module.scss"

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return(
        <>
            <button
                type="button"
                className={`${styles.burgerButton} ${isOpen ? styles.burgerButtonOpen : ""}`}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isOpen}
                aria-controls="account-sidebar"
            >
                <span />
                <span />
                <span />
            </button>

            {isOpen ? (
                <button
                    type="button"
                    className={styles.backdrop}
                    onClick={() => setIsOpen(false)}
                    aria-label="Закрыть меню"
                />
            ) : null}

            <aside
                id="account-sidebar"
                className={`${styles.aside} ${isOpen ? styles.mobileOpen : ""}`}
            >
                <div className={styles.logoDesktop}>
                    <Image
                        src="/logo/logo_sidebar.svg"
                        alt="Logo Icon"
                        width={42}
                        height={42}
                    />
                    <h3>VegVision</h3>
                </div>
                <LinksPart onNavigate={() => setIsOpen(false)} />
            </aside>
        </>
    )
}
