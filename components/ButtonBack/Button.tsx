import Link from "next/link";
import styles from "./Button.module.css"
import Image from "next/image"

export function ButtonBack() {
    return(
        <Link href="/" >
            <div className={styles.back}>
                <Image 
                    src="/arrow-left.svg"
                    alt="arrow left"
                    width={34}
                    height={34}
                    
                />
            </div>
        </Link>
    )
}