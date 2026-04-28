import Image from "next/image";
import styles from "./SummaryCard.module.scss";

interface SummaryCardProps {
  icon: string;
  title: string;
  value: string;
}

export function SummaryCard({ icon, title, value }: SummaryCardProps) {
  return (
    <section className={styles.block}>
      <div className={styles.icon}>
        <Image src={icon} alt="icon" height={40} width={50} />
      </div>
      <h3>{title}</h3>
      <span>{value}</span>
    </section>
  );
}
