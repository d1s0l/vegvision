"use client";

import { ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { ADMIN_DASHBOARD_PATH } from "@/shared/lib/admin-auth/constants";
import { useAdminAuth } from "../model/use-admin-auth";
import styles from "./AdminLoginForm.module.scss";

export function AdminLoginForm() {
  const { login, isLoading, error } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login(email, password);
      window.location.replace(ADMIN_DASHBOARD_PATH);
    } catch {
      // The auth context stores and exposes the error message.
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
            <span>Введите учетные данные администратора.</span>
          </div>
          <Sparkles size={18} />
        </div>

        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@vegvision.io"
            required
          />
        </label>

        <label className={styles.field}>
          <span>Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Введите пароль"
            required
          />
        </label>

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? "Авторизация..." : "Открыть admin panel"}
        </button>

        {error ? <p className={styles.error}>{error}</p> : null}
      </form>
    </section>
  );
}
