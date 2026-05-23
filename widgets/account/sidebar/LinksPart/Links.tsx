'use client'

import { BarChart3, CircleHelp, Home, Settings } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { SectionSidebar } from "../Section/Section";
import styles from "./Links.module.scss"

interface LinksPartProps {
    onNavigate?: () => void;
}

export function LinksPart({ onNavigate }: LinksPartProps) {
    const pathname = usePathname();
    const params = useParams<{ username?: string }>();
    const username = typeof params.username === "string" ? params.username : "";

    const homeHref = username ? `/u/${username}` : "/";
    const analyticsHref = username ? `/u/${username}/analytics` : "/";
    const settingsHref = username ? `/u/${username}/settings` : "/";

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
            href: settingsHref,
            active: pathname === settingsHref,
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
                        onClick={onNavigate}
                    />
                ))}
                {navItems.slice(2).map((item) => (
                    <SectionSidebar
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        active={item.active}
                        onClick={onNavigate}
                    />
                ))}
            </div>
    )
}
