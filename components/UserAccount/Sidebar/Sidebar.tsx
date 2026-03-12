import styles from "./Sidebar.module.scss"
import { LinksPart } from "./LinksPart/Links"


export function Sidebar(){
    return(
        <aside className={styles.aside}>
            <a className={styles.logoDesktop}>
                <img
                    src="/logo/logo_sidebar.svg"
                    alt="Logo Icon"
                   
                />
                <h3>VegVision</h3>
            </a>
            <LinksPart />
            
        </aside>
    )
}