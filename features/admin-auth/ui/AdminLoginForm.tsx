"use client";

import { useRouter } from "next/navigation";
import { ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { mockAdminCredentials } from "@/entities/admin";
import { ADMIN_DASHBOARD_PATH } from "@/shared/lib/admin-auth/constants";
import { useAdminAuth } from "../model/use-admin-auth";
import styles from "./AdminLoginForm.module.scss";

export function AdminLoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAdminAuth();
  const [email, setEmail] = useState(mockAdminCredentials.email);
  const [password, setPassword] = useState(mockAdminCredentials.password);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login(email, password);
      router.push(ADMIN_DASHBOARD_PATH);
      router.refresh();
    } catch {
      // ошибка уже обработана в контексте
    }
  };

  return (
    <section className={styles.shell}>
      <div className={styles.copy}>
        <span className={styles.badge}>
          <ShieldCheck size={16} />
          Внутренний доступ
        </span>
        <h1>VegVision Admin</h1>
        
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formHead}>
          <div>
            <strong>Вход администратора</strong>
            <span>Access token хранится только в памяти, refresh работает через cookie.</span>
          </div>
          <Sparkles size={18} />
        </div>

        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="owner@vegvision.app"
          />
        </label>

        <label className={styles.field}>
          <span>Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Введите пароль"
          />
        </label>

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? "Авторизация..." : "Открыть admin panel"}
        </button>

        {error ? <p className={styles.error}>{error}</p> : null}

        <div className={styles.hint}>
          <span>Тестовые данные</span>
          <strong>{mockAdminCredentials.email}</strong>
          <strong>{mockAdminCredentials.password}</strong>
        </div>
      </form>
    </section>
  );
}
