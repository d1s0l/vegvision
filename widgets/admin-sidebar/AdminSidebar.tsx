"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Logs,
  Network,
  Settings,
  Sparkles,
  Users,
  UsersRound,
} from "lucide-react";
import styles from "./AdminSidebar.module.scss";

const navItems = [
  { href: "/admin/dashboard", label: "Обзор", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Клиенты", icon: UsersRound },
  { href: "/admin/billing", label: "Биллинг", icon: CreditCard },
  { href: "/admin/monitoring", label: "Мониторинг", icon: Activity },
  { href: "/admin/ml-system", label: "ML-система", icon: Sparkles },
  { href: "/admin/alerts", label: "Алерты", icon: AlertTriangle },
  { href: "/admin/analytics", label: "Аналитика", icon: BarChart3 },
  { href: "/admin/users", label: "Пользователи", icon: Users },
  { href: "/admin/logs", label: "Логи", icon: Logs },
  { href: "/admin/settings", label: "Настройки", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={`${styles.burgerButton} ${isOpen ? styles.burgerButtonOpen : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Закрыть меню администратора" : "Открыть меню администратора"}
        aria-expanded={isOpen}
        aria-controls="admin-sidebar"
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
          aria-label="Закрыть меню администратора"
        />
      ) : null}

      <aside
        id="admin-sidebar"
        className={`${styles.sidebar} ${isOpen ? styles.mobileOpen : ""}`}
      >
        <div className={styles.brand}>
          <Link href="/admin/dashboard" className={styles.logo} onClick={() => setIsOpen(false)}>
            <Image src="/logo/logo_sidebar.svg" alt="VegVision" width={42} height={42} />
            <div>
              <strong>VegVision</strong>
              <span>Панель администратора</span>
            </div>
          </Link>

          <div className={styles.clusterStatus}>
            <Network size={16} />
            Платформа стабильна
          </div>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
