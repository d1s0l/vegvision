"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { isValidPhoneNumber } from "react-phone-number-input/input"
import styles from "./WorkWithUs.module.scss"

type FormValues = {
    name: string
    company: string
    email: string
    phone: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>
type TouchedFields = Partial<Record<keyof FormValues, boolean>>

const INITIAL_VALUES: FormValues = {
    name: "",
    company: "",
    email: "",
    phone: "",
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_ALLOWED_PATTERN = /[^\p{L}\s'-]/gu
const COMPANY_ALLOWED_PATTERN = /[^\p{L}\p{N}\s"'.,&()\-]/gu
const MULTIPLE_SPACES_PATTERN = /\s{2,}/g

const normalizeName = (value: string) =>
    value
        .replace(NAME_ALLOWED_PATTERN, "")
        .replace(MULTIPLE_SPACES_PATTERN, " ")
        .slice(0, 60)

const normalizeCompany = (value: string) =>
    value
        .replace(COMPANY_ALLOWED_PATTERN, "")
        .replace(MULTIPLE_SPACES_PATTERN, " ")
        .slice(0, 80)

const normalizeEmail = (value: string) =>
    value
        .replace(/\s/g, "")
        .toLowerCase()
        .slice(0, 120)

const normalizePhone = (value: string) => {
    const hasPlus = value.trim().startsWith("+")
    const digitsOnly = value.replace(/\D/g, "").slice(0, 15)

    if (!digitsOnly) {
        return ""
    }

    if (!hasPlus && (digitsOnly[0] === "8" || digitsOnly[0] === "7")) {
        return `+7${digitsOnly.slice(1, 11)}`
    }

    return `+${digitsOnly}`
}

const hasLetter = (value: string) => /\p{L}/u.test(value)

const parseJsonResponse = async (response: Response) => {
    const text = await response.text()

    if (!text) {
        return {} as { message?: string }
    }

    try {
        return JSON.parse(text) as { message?: string }
    } catch {
        return {
            message: response.ok
                ? undefined
                : "Сервер вернул некорректный ответ. Попробуйте позже.",
        }
    }
}

export function WorkWithUs() {
    const [formValues, setFormValues] = useState<FormValues>(INITIAL_VALUES)
    const [errors, setErrors] = useState<FormErrors>({})
    const [touched, setTouched] = useState<TouchedFields>({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [submitError, setSubmitError] = useState("")

    const validateField = (field: keyof FormValues, rawValue: string) => {
        const value = rawValue.trim()

        switch (field) {
            case "name":
                if (!value) {
                    return "Введите имя"
                }

                if (value.length < 2) {
                    return "Имя должно содержать минимум 2 символа"
                }

                if (!hasLetter(value)) {
                    return "Имя должно содержать буквы"
                }

                return ""

            case "company":
                if (!value) {
                    return "Введите название компании"
                }

                if (value.length < 2) {
                    return "Название компании слишком короткое"
                }

                if (!hasLetter(value)) {
                    return "Название должно содержать буквы"
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
                if (value.length < 12) {
                    return "Номер телефона слишком короткий"
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
        setTouched({
            name: true,
            company: true,
            email: true,
            phone: true,
        })

        return Object.keys(nextErrors).length === 0
    }

    const handleInputChange = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement>) => {
        const nextValue = (() => {
            switch (field) {
                case "name":
                    return normalizeName(event.target.value)
                case "company":
                    return normalizeCompany(event.target.value)
                case "email":
                    return normalizeEmail(event.target.value)
                default:
                    return event.target.value
            }
        })()

        setFormValues((prev) => ({
            ...prev,
            [field]: nextValue,
        }))
        setIsSubmitted(false)
        setSubmitError("")

        setErrors((prev) => {
            if (!touched[field] && !prev[field]) {
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
        setIsSubmitted(false)
        setSubmitError("")

        setErrors((prev) => {
            if (!touched.phone && !prev.phone) {
                return prev
            }

            return {
                ...prev,
                phone: validateField("phone", nextValue),
            }
        })
    }

    const handleBlur = (field: keyof FormValues) => () => {
        setTouched((prev) => ({
            ...prev,
            [field]: true,
        }))
        setErrors((prev) => ({
            ...prev,
            [field]: validateField(field, formValues[field]),
        }))
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitError("")

        if (!validateForm()) {
            return
        }

        setIsSending(true)

        try {
            const response = await fetch("/api/work-with-us", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            })

            const payload = await parseJsonResponse(response)

            if (!response.ok) {
                throw new Error(payload.message ?? "Не удалось отправить заявку")
            }

            setFormValues(INITIAL_VALUES)
            setErrors({})
            setTouched({})
            setIsSubmitted(true)
        } catch (error) {
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "Не удалось отправить заявку. Попробуйте позже.",
            )
        } finally {
            setIsSending(false)
        }
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
                                autoComplete="given-name"
                                maxLength={60}
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? "work-with-us-name-error" : undefined}
                                className={errors.name ? styles.inputError : ""}
                            />
                            {errors.name ? (
                                <span className={styles.fieldError} id="work-with-us-name-error">
                                    {errors.name}
                                </span>
                            ) : null}
                        </div>
                        <div className={styles.field}>
                            <input
                                type="text"
                                placeholder="Компания"
                                value={formValues.company}
                                onChange={handleInputChange("company")}
                                onBlur={handleBlur("company")}
                                autoComplete="organization"
                                maxLength={80}
                                aria-invalid={Boolean(errors.company)}
                                aria-describedby={errors.company ? "work-with-us-company-error" : undefined}
                                className={errors.company ? styles.inputError : ""}
                            />
                            {errors.company ? (
                                <span className={styles.fieldError} id="work-with-us-company-error">
                                    {errors.company}
                                </span>
                            ) : null}
                        </div>
                        <div className={styles.field}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={handleInputChange("email")}
                                onBlur={handleBlur("email")}
                                autoComplete="email"
                                maxLength={120}
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? "work-with-us-email-error" : undefined}
                                className={errors.email ? styles.inputError : ""}
                            />
                            {errors.email ? (
                                <span className={styles.fieldError} id="work-with-us-email-error">
                                    {errors.email}
                                </span>
                            ) : null}
                        </div>
                        <div className={styles.field}>
                            <input
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                placeholder="Телефон"
                                value={formValues.phone}
                                onChange={handlePhoneChange}
                                onBlur={handleBlur("phone")}
                                maxLength={16}
                                aria-invalid={Boolean(errors.phone)}
                                aria-describedby={errors.phone ? "work-with-us-phone-error" : undefined}
                                className={errors.phone ? styles.inputError : ""}
                            />
                            {errors.phone ? (
                                <span className={styles.fieldError} id="work-with-us-phone-error">
                                    {errors.phone}
                                </span>
                            ) : null}
                        </div>
                    </div>
                    {isSubmitted ? (
                        <p className={styles.successMessage} role="status">
                            Заявка отправлена. Мы свяжемся с вами в ближайшее время.
                        </p>
                    ) : null}
                    {submitError ? (
                        <p className={styles.submitError} role="alert">
                            {submitError}
                        </p>
                    ) : null}
                    <div className={styles.buttonContainer}>
                        <button className={styles.buttonWrapper} type="submit" disabled={isSending}>
                            {isSending ? "Отправка..." : "Отправить"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}
