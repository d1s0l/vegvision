import styles from "./InfoCard.module.scss"
import { InfoCardItem } from "./InfoCardItem"
import type { InfoCardProps } from "./InfoCard.types"

export function InfoCard({ title, items, variant }: InfoCardProps) {
  return (
    <section className={`${styles.card} ${styles[variant]}`}>
      <h2 className={styles.title}>{title}</h2>

      <ul className={styles.list}>
        {items.map((item, index) => (
          <InfoCardItem
            key={item.id}
            text={item.text}
            showDivider={index !== items.length - 1}
          />
        ))}
      </ul>
    </section>
  )
}