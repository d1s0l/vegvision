import styles from "./InfoCard.module.css"

interface Props {
  text: string
  showDivider: boolean
}

export function InfoCardItem({ text, showDivider }: Props) {
  return (
    <li className={styles.item}>
      <p className={styles.text}>{text}</p>
      {showDivider && <div className={styles.divider} />}
    </li>
  )
}