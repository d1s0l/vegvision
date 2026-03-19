'use client'

import { useEffect, useState } from "react";
import { getUser } from "@/lib/api";
import styles from "./UserGreeting.module.scss"

export default function UserGreeting() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getUser();
        setName(data?.name || null);
      } catch {
        setName(null);
      }
    }

    loadUser();
  }, []);

  return (
    <div className={styles.helloText}>
        <h1>{name ? `Здравствуйте, ${name}!` : "Здравствуйте!"}</h1>
        <img src="/lk/leaf.svg" alt="leaf" />
    </div>
  );
}