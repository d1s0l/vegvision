import Header from "@/components/Landing/Header/Header"
import styles from "./Contacts.module.scss"
import { WorkWithUs } from "@/components/Landing/WorkWithUs/WorkWithUs"

export default function Contacts() {
    return(
        <div >
            <Header variant="dark"/>
            <WorkWithUs />
        </div>
    )
}