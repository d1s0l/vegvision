"use client";

import { useCallback, ReactNode } from "react";

interface ScrollButtonProps {
    targetId: string;
    children?: ReactNode;
    className?: string;
}

export function ScrollButton({ 
    targetId, 
    children = "Подробнее",
    className 
}: ScrollButtonProps) {
    const scrollToSection = useCallback(() => {
        const element = document.getElementById(targetId) as HTMLElement | null;
        const header = document.querySelector('.header') as HTMLElement | null;
        
        if (element) {
            const headerHeight = header ? header.offsetHeight : 0;
            const y = element.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
            
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    }, [targetId]);

    return (
        <button onClick={scrollToSection} className={className}>
            {children}
        </button>
    );
}