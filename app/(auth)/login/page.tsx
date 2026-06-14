import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import styles from "@/shared/ui/auth-shell/AuthShell.module.scss";
import { ButtonBack } from "@/shared/ui/button-back";
import { LoginForm } from "@/features/auth/login-form";
import { UserAuthProvider } from "@/features/user-auth";

export const metadata: Metadata = {
  title: "Вход",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Login() {
  return (
    <div className={styles.loginMenu}>
      <div className={styles.menu}>
        <ButtonBack />
        <div className={styles.auth}>
          <Link href="/" className={styles.logo}>
            <Image
              src="./logo/logo_auth.svg"
              alt="Logo"
              className={styles.logoImage}
              width={79}
              height={65}
            />
            <h1>VegVision</h1>
          </Link>
          <UserAuthProvider>
            <LoginForm />
          </UserAuthProvider>
          <div className={styles.regist}>
            <span>Нет аккаунта?</span>
            <Link href="/registration">Регистрация</Link>
          </div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.container} />
      </div>
    </div>
  );
}
