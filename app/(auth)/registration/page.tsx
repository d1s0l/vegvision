import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import styles from "@/shared/ui/auth-shell/AuthShell.module.scss";
import { ButtonBack } from "@/shared/ui/button-back";
import { RegistrationForm } from "@/features/auth/registration-form";

export const metadata: Metadata = {
  title: "Регистрация",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Registraion() {
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
          <RegistrationForm />
          <div className={styles.regist}>
            <span>Уже есть аккаунт?</span>
            <Link href="/login">Войти</Link>
          </div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.container} />
      </div>
    </div>
  );
}
