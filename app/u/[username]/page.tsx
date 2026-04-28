import { Analiz } from "@/widgets/account/analysis";
import { BlockSection } from "@/widgets/account/home-block-section";
import { UserGreeting } from "@/widgets/account/user-greeting";
import styles from "./LkHome.module.scss"

export default function User(){
    return(
        <div className={styles.home}>
            <UserGreeting />
            <BlockSection />
            <Analiz />
        </div>
    )
}
