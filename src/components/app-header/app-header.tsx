import styles from "./app-header.module.css";
import { LogoUI, TelegramLogoUI, WhatsappLogoUI } from "../ui";

export const AppHeader = () => (
  <header className={styles.container} id="header">
    <nav className={styles.menu}>
      <div className={styles.logo}>
        <a href="http://localhost:8080/" className={styles.link}>
          <LogoUI
            fill="var(--main-color)"
            fillOnHover="var(--hover-color)"
           />
        </a>
      </div>
      <div>
        <a href="tel:+79111005005" className={styles.link}>
          <p className={styles.telephone}>+7 (911) 100-50-05</p>
        </a>
      </div>
      <div className={styles.icon}>
        <a
          href="https://t.me/+79111005005"
          target="_blank"
          className={styles.link}
          rel="noopener noreferrer"
          aria-label="Свяжитесь с нами по Telegram"
        >
          <TelegramLogoUI fill="#c6c6c6" />
        </a>
      </div>
      <div className={styles.icon}>
        <a
          href="https://wa.me/79111005005"
          target="_blank"
          className={styles.link}
          rel="noopener noreferrer"
          aria-label="Свяжитесь с нами по Whatsapp"
        >
          <WhatsappLogoUI fill="#c6c6c6" />
        </a>
      </div>
    </nav>
  </header>
);
