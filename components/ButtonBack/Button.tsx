import Link from "next/link";
import styles from "./Button.module.scss"
import Image from "next/image"

export function ButtonBack() {
    return(
        <div className={styles.back}>
            <Link href="/" >
                <Image 
                    src="/arrow-left.svg"
                    alt="arrow left"
                    width={34}
                    height={34}
                    
                />
            </Link>
        </div>
    )
}