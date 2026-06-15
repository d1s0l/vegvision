"use client";

import { useState } from "react";
import styles from "@/shared/ui/password-input/PasswordInput.module.scss";

export function PasswordInputLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={styles.box}>
        <label htmlFor="password">Пароль</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="**********"
          required
          className={styles.input}
        />
      </div>
      <label className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          className={styles.checkbox}
        />
        Показать пароль
      </label>
    </>
  );
}
