'use client'

import Image from "next/image"
import styles from "./Login.module.css"
import { useState } from "react"
import Link from "next/link";
import { Button } from "@/components/Button/Button";


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);


    return(
        <div className={styles.loginMenu}>
            <Button/>
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
                            <input type="email" placeholder="Enter your email" required className={styles.input}/>
                        </div>
                        <div className={styles.box}>
                            <label>password</label>
                            <input type={showPassword ? "text" : "password"} placeholder="••••••••" required className={styles.input}/>
                        </div>
                    </div>
                    <label className={styles.checkboxWrapper}>
                        <input type="checkbox" 
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className={styles.checkbox}
                        />
                        Показать пароль
                    </label>
                    <button type="submit" className={styles.authButton}>Войти</button>
                </form>
                <div className={styles.regist}>
                    <span>Нет аккаунта?</span>
                    <a href="">Регистрация</a>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.container}>

                </div>
            </div>
        </div>
    )
}