'use client'

import { CSSProperties, ElementType, ReactNode, useEffect, useRef, useState } from "react"
import styles from "./ScrollReveal.module.scss"

type ScrollRevealProps = {
    children: ReactNode
    className?: string
    as?: ElementType
    direction?: "up" | "right" | "left"
    delay?: number
    distance?: number
    threshold?: number
}

export function ScrollReveal({
    children,
    className = "",
    as = "div",
    direction = "up",
    delay = 0,
    distance = 56,
    threshold = 0.18,
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false)
    const elementRef = useRef<Element | null>(null)

    useEffect(() => {
        const element = elementRef.current

        if (!element) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return
                }

                setIsVisible(true)
                observer.unobserve(entry.target)
            },
            {
                threshold,
                rootMargin: "0px 0px -10% 0px",
            }
        )

        observer.observe(element)

        return () => observer.disconnect()
    }, [threshold])

    const Tag = as

    const style = {
        "--reveal-delay": `${delay}ms`,
        "--reveal-distance": `${distance}px`,
    } as CSSProperties

    return (
        <Tag
            ref={elementRef}
            className={[
                styles.reveal,
                styles[direction],
                isVisible ? styles.visible : "",
                className,
            ].filter(Boolean).join(" ")}
            style={style}
        >
            {children}
        </Tag>
    )
}
