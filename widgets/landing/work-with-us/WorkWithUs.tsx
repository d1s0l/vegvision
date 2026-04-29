'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { isValidPhoneNumber } from 'react-phone-number-input/input'
import styles from "./WorkWithUs.module.scss"

type FormValues = {
    name: string
    company: string
    email: string
    phone: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const INITIAL_VALUES: FormValues = {
    name: "",
    company: "",
    email: "",
    phone: "",
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LETTERS_ONLY_PATTERN = /[^\p{L}]/gu

const normalizeName = (value: string) => value.replace(LETTERS_ONLY_PATTERN, "")

const normalizePhone = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "")

    if (!digitsOnly) {
        return ""
    }

    if (digitsOnly[0] === "8" || digitsOnly[0] === "7") {
        return `+7${digitsOnly.slice(1, 11)}`
    }

    return `+${digitsOnly.slice(0, 11)}`
}

export function WorkWithUs() {
    const [formValues, setFormValues] = useState<FormValues>(INITIAL_VALUES)
    const [errors, setErrors] = useState<FormErrors>({})

    const validateField = (field: keyof FormValues, rawValue: string) => {
        const value = rawValue.trim()

        switch (field) {
            case "name":
                if (!value) {
                    return "Введите имя"
                }

                if (value.length < 2) {
                    return "Имя должно содержать минимум 2 буквы"
                }

                return ""
            case "company":
                if (!value) {
                    return "Введите название компании"
                }

                if (value.length < 2) {
                    return "Название компании слишком короткое"
                }

                return ""
            case "email":
                if (!value) {
                    return "Введите email"
                }

                if (!EMAIL_PATTERN.test(value)) {
                    return "Введите корректный email"
                }

                return ""
            case "phone":
                if (!value) {
                    return "Введите телефон"
                }

                if (!isValidPhoneNumber(value)) {
                    return "Введите корректный номер телефона"
                }

                return ""
        }
    }

    const validateForm = () => {
        const nextErrors: FormErrors = {}

        ;(Object.keys(formValues) as Array<keyof FormValues>).forEach((field) => {
            const error = validateField(field, formValues[field])

            if (error) {
                nextErrors[field] = error
            }
        })

        setErrors(nextErrors)

        return Object.keys(nextErrors).length === 0
    }

    const handleInputChange = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement>) => {
        const nextValue = field === "name"
            ? normalizeName(event.target.value)
            : event.target.value

        setFormValues((prev) => ({
            ...prev,
            [field]: nextValue,
        }))

        setErrors((prev) => {
            if (!prev[field]) {
                return prev
            }

            return {
                ...prev,
                [field]: validateField(field, nextValue),
            }
        })
    }

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextValue = normalizePhone(event.target.value)

        setFormValues((prev) => ({
            ...prev,
            phone: nextValue,
        }))

        setErrors((prev) => {
            if (!prev.phone) {
                return prev
            }

            return {
                ...prev,
                phone: validateField("phone", nextValue),
            }
        })
    }

    const handleBlur = (field: keyof FormValues) => () => {
        setErrors((prev) => ({
            ...prev,
            [field]: validateField(field, formValues[field]),
        }))
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        setFormValues(INITIAL_VALUES)
        setErrors({})
    }

    return (
        <section className={styles.container}>
            <div>
                <h1>Работа с нами</h1>
                <h5>Заполните заявку на работу с нами</h5>
            </div>
            <div>
                <span>Контактные данные</span>
                <form onSubmit={handleSubmit} noValidate>
                    <div className={styles.formGrid}>
                        <div className={styles.field}>
                            <input
                                type="text"
                                placeholder="Имя"
                                value={formValues.name}
                                onChange={handleInputChange("name")}
                                onBlur={handleBlur("name")}
                                className={errors.name ? styles.inputError : ""}
                            />
                            {errors.name ? <span className={styles.fieldError}>{errors.name}</span> : null}
                        </div>
                        <div className={styles.field}>
                            <input
                                type="text"
                                placeholder="Компания"
                                value={formValues.company}
                                onChange={handleInputChange("company")}
                                onBlur={handleBlur("company")}
                                className={errors.company ? styles.inputError : ""}
                            />
                            {errors.company ? <span className={styles.fieldError}>{errors.company}</span> : null}
                        </div>
                        <div className={styles.field}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={handleInputChange("email")}
                                onBlur={handleBlur("email")}
                                className={errors.email ? styles.inputError : ""}
                            />
                            {errors.email ? <span className={styles.fieldError}>{errors.email}</span> : null}
                        </div>
                        <div className={styles.field}>
                            <input
                                type="tel"
                                inputMode="numeric"
                                autoComplete="tel"
                                placeholder="Телефон"
                                value={formValues.phone}
                                onChange={handlePhoneChange}
                                onBlur={handleBlur("phone")}
                                className={errors.phone ? styles.inputError : ""}
                            />
                            {errors.phone ? <span className={styles.fieldError}>{errors.phone}</span> : null}
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.buttonWrapper} type="submit">
                            Отправить
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}
