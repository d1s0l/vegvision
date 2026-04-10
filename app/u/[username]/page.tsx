import { BlockSection } from "@/components/lk/Home/HomeBlock/BlockSection";
import UserGreeting from "@/components/UserGreeting/UserGreeting";
import { Analiz } from "@/components/lk/Home/Analized/Analiz";
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