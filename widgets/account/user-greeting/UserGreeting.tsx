'use client'

import { useCurrentUser } from "@/entities/user";
import styles from "./UserGreeting.module.scss"

export default function UserGreeting() {
  const { user } = useCurrentUser();

  return (
    <div className={styles.helloText}>
        <h1>{user?.name ? `Здравствуйте, ${user.name}!` : "Здравствуйте!"}</h1>
        <img src="/lk/leaf.svg" alt="leaf" />
    </div>
  );
}
