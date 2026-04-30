'use client'

import Link from "next/link";
import { BarChart3, CircleHelp, Home, Settings } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { SectionSidebar } from "../Section/Section";
import styles from "./Links.module.scss"

export function LinksPart() {
    const pathname = usePathname();
    const params = useParams<{ username?: string }>();
    const username = typeof params.username === "string" ? params.username : "";

    const homeHref = username ? `/u/${username}` : "/dashboard";
    const analyticsHref = username ? `/u/${username}/analytics` : "/dashboard/analytics";

    const navItems = [
        {
            icon: <Home size={26} />,
            label: "Главная",
            href: homeHref,
            active: pathname === homeHref,
        },
        {
            icon: <BarChart3 size={26} />,
            label: "Аналитика",
            href: analyticsHref,
            active: pathname === analyticsHref,
        },
        {
            icon: <Settings size={26} />,
            label: "Настройки",
            href: homeHref,
            active: false,
        },
        {
            icon: <CircleHelp size={26} />,
            label: "Помощь",
            href: homeHref,
            active: false,
        },
    ];

    return(
            <div className={styles.DesktopPart}>
                {navItems.slice(0, 2).map((item) => (
                    <SectionSidebar
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        active={item.active}
                    />
                ))}
                <Link href={homeHref} className={styles.logoPhone}>
                    <img
                        src="/logo/logo_sidebar.svg"
                        alt="Logo Icon"
                    />
                </Link>
                {navItems.slice(2).map((item) => (
                    <SectionSidebar
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        active={item.active}
                    />
                ))}
            </div>
    )
}
