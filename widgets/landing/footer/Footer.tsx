import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.upper}>
        <div className={styles.logo}>
          <Image
            src="./logo/logo_footer.svg"
            alt="logo"
            width={54}
            height={48}
          />
          <span>VegVision</span>
        </div>
        <p>
          AI-помощник для диагностики заболеваний растений
        </p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.lowwer}>
        <div className={styles.linkspage}>
          <Link href="/">Главная</Link>
          <Link href="/about">О нас</Link>
          <Link href="/contacts">Контакты</Link>
        </div>

        <p className={styles.rights}>© 2026 VegVision. All Rights Reserved</p>
      </div>
    </footer>
  );
}