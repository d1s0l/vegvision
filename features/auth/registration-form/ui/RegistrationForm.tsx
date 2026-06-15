"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, getApiErrorMessage } from "@/shared/lib/api";
import { PasswordInputRegistraion } from "@/shared/ui/password-input";
import styles from "@/shared/ui/auth-shell/AuthShell.module.scss";

export function RegistrationForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const phone = String(formData.get("phone") ?? "");

    try {
      await api.post("/api/users", {
        email,
        password,
        phone,
        role: "user",
        is_active: true,
      });

      router.push("/login");
      router.refresh();
    } catch (registrationError) {
      setError(getApiErrorMessage(registrationError, "Registration failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <div className={styles.allboxes}>
        <div className={styles.box}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.box}>
          <label htmlFor="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+79990000000"
            required
            className={styles.input}
          />
        </div>
        <PasswordInputRegistraion />
      </div>
      <button type="submit" className={styles.authButton} disabled={isLoading}>
        {isLoading ? "Регистрация..." : "Зарегистрировать"}
      </button>
      {error ? <p className={styles.error}>{error}</p> : null}
    </form>
  );
}
