import Image from "next/image"
import styles from "@/app/(auth)/Auth.module.scss"
import Link from "next/link";
import { ButtonBack } from "@/components/ButtonBack/Button";
import { PasswordInputLogin } from "@/components/PasswordInput/Login/PasswordInputLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Авторизация"
}

export default function Login() {
    return(
        <div className={styles.loginMenu}>
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
                <form className={styles.form}>
                    <h2>Авторизация</h2>
                    <div className={styles.allboxes}>  
                        <div className={styles.box}>
                            <label>Email</label>
                            <input type="email" placeholder="example@gmail.com" required className={styles.input}/>
                        </div>
                    <PasswordInputLogin />
                    </div>
                    <button type="submit" className={styles.authButton}>Войти</button>
                </form>
                <div className={styles.regist}>
                    <span>Нет аккаунта?</span>
                    <a href="/registration">Регистрация</a>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.container}>

                </div>
            </div>
        </div>
    )
}