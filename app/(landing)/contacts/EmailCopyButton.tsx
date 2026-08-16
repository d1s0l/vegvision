"use client"

import { useState } from "react"
import styles from "./Contacts.module.scss"

interface EmailCopyButtonProps {
    email: string
}

export function EmailCopyButton({ email }: EmailCopyButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(email)
        } catch {
            
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <span className={styles.actionWrap}>
            <a
                className={styles.cardAction}
                href={`mailto:${email}`}
                aria-label="Написать письмо"
                onClick={handleClick}
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.5 6.5L19 12l-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
            <span
                className={`${styles.toast} ${copied ? styles.toastVisible : ""}`}
                role="status"
                aria-live="polite"
            >
                Email скопирован
            </span>
        </span>
    )
}