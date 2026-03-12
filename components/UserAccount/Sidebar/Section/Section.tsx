import Link from "next/link"
import { SectionProps } from "./SectionInterface"
import styles from "./Section.module.scss"

export function SectionSidebar({icon, label, href, active, onClick}: SectionProps){
    return(
        <Link href={href}
            onClick={onClick}
            className={`${styles.item} ${active ? styles.active : ""}`}
        >
            {icon}
            <span>{label}</span>
        </Link>
    )
}    