import styles from "./app-header.module.css";
import { LogoUI, TelegramLogoUI, WhatsappLogoUI } from "../ui";

 const AppHeader = () => (
  <header className={styles.container} id="header">
    <div className={styles.menu}>
      <div className={styles.logo}>
        <a href="https://szimina.students.nomorepartiesco.ru/" className={styles.link}>
          <LogoUI
            fill="var(--main-color)"
            fillOnHover="var(--hover-color)"
           />
        </a>
      </div>
      <div>
        <a href="tel:+79263544901" className={styles.link}>
          <p className={styles.telephone}>+7 (926) 354-49-01</p>
        </a>
      </div>
      <div className={styles.icon}>
        <a
          href="https://t.me/+79263544901"
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
          href="https://wa.me/79263544901"
          target="_blank"
          className={styles.link}
          rel="noopener noreferrer"
          aria-label="Свяжитесь с нами по Whatsapp"
        >
          <WhatsappLogoUI fill="#c6c6c6" />
        </a>
      </div>
    </div>
  </header>
);

export default AppHeader;