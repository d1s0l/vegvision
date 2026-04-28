import { PasswordInputRegistraion } from "@/shared/ui/password-input";
import styles from "@/shared/ui/auth-shell/AuthShell.module.scss";

export function RegistrationForm() {
  return (
    <form className={styles.form}>
      <h2>Регистрация</h2>
      <div className={styles.allboxes}>
        <div className={styles.box}>
          <label>Email</label>
          <input type="email" placeholder="example@gmail.com" required className={styles.input} />
        </div>
        <PasswordInputRegistraion />
      </div>
      <button type="submit" className={styles.authButton}>Зарегистрироваться</button>
    </form>
  );
}
