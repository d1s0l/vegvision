import Image from "next/image"
import styles from "@/shared/ui/auth-shell/AuthShell.module.scss"
import Link from "next/link";
import { ButtonBack } from "@/shared/ui/button-back";
import { LoginForm } from "@/features/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Авторизация"
}

export default function Login() {
    return(
        <div className={styles.loginMenu}>
            <div className={styles.menu}>
                <ButtonBack/>
                <div className={styles.auth}>
                    <Link href="/" className={styles.logo}>
                        <Image 
                            src="./logo/logo_auth.svg"
                            alt="Logo"
                            width={79}
                            height={65}
                        />
                        <h1>VegVision</h1>
                    </Link>
                    <LoginForm />
                    <div className={styles.regist}>
                        <span>Нет аккаунта?</span>
                        <a href="/registration">Регистрация</a>
                    </div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.container}>

                </div>
            </div>
        </div>
    )
}
