'use client'

import { SectionSidebar } from "../Section/Section";
import styles from "./Links.module.scss"
import { useState } from "react";


export function LinksPart() {
    const [active, setActive] = useState("Главная")

    return(
            <div className={styles.DesktopPart}>
                <SectionSidebar
                    icon={<img src="/sidebarIcon/Home.svg" alt="Home Icon" width={26} height={26}/>}
                    label="Главная"
                    href=""
                    active={active === "Главная"}
                    onClick={() => setActive("Главная")}
                />
                <SectionSidebar
                    icon={<img src="/sidebarIcon/Home.svg" alt="Home Icon" width={26} height={26}/>}
                    label="Анализ"
                    href=""
                    active={active === "Анализ"}
                    onClick={() => setActive("Анализ")}
                />
                <a className={styles.logoPhone}>
                    <img
                        src="/logo/logo_sidebar.svg"
                        alt="Logo Icon"
                        
                    />
                </a>
                <SectionSidebar
                    icon={<img src="/sidebarIcon/Home.svg" alt="Home Icon" width={26} height={26}/>}
                    label="Настройки"
                    href=""
                    active={active === "Настройки"}
                    onClick={() => setActive("Настройки")}
                />
                <SectionSidebar
                    icon={<img src="/sidebarIcon/Home.svg" alt="Home Icon" width={26} height={26}/>}
                    label="Помощь"
                    href=""
                    active={active === "Помощь"}
                    onClick={() => setActive("Помощь")}
                />
            </div>
    )
}