import Image from "next/image"
import styles from "@/shared/ui/auth-shell/AuthShell.module.scss"
import Link from "next/link";
import { ButtonBack } from "@/shared/ui/button-back";
import { RegistrationForm } from "@/features/auth/registration-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Регистрация"
}


export default function Registraion() {
    return(
        <div className={styles.loginMenu}>
            <ButtonBack />
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
                <RegistrationForm />
                <div className={styles.regist}>
                    <span>Нет аккаунта?</span>
                    <a href="/login">Войти</a>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.container}>

                </div>
            </div>
        </div>
    )
}
