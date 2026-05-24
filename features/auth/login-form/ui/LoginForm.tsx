"use client";

import { useRouter } from "next/navigation";
import { mockUserCredentials } from "@/entities/user";
import { useUserAuth } from "@/features/user-auth";
import { USER_DASHBOARD_PATH } from "@/shared/lib/user-auth/constants";
import { PasswordInputLogin } from "@/shared/ui/password-input";
import styles from "@/shared/ui/auth-shell/AuthShell.module.scss";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useUserAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      await login(email, password);
      router.push(USER_DASHBOARD_PATH);
      router.refresh();
    } catch {
      // The auth context stores and exposes the error message.
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Авторизация</h2>
      <div className={styles.allboxes}>
        <div className={styles.box}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="admin"
            defaultValue={mockUserCredentials.email}
            required
            className={styles.input}
          />
        </div>
        <PasswordInputLogin />
      </div>
      <button type="submit" className={styles.authButton} disabled={isLoading}>
        {isLoading ? "Авторизация..." : "Войти"}
      </button>
      {error ? <p className={styles.error}>{error}</p> : null}
    </form>
  );
}
