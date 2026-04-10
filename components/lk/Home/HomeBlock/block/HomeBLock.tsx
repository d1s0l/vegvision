import styles from "./HomeBlock.module.scss"
import Image from "next/image";

export interface HomeBlockProps {
    image: string;
    h1: string;
    data: string;
}


export function HomeBlock({image, h1, data}: HomeBlockProps){
    return(
        <section className={styles.block}>
            <div className={styles.icon}>
                <Image src={image} alt="icon" height={40} width={50}/>
            </div>
            <h3>{h1}</h3>
            <span>{data}</span>
        </section>
    )
}