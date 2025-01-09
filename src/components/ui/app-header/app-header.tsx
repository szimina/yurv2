import styles from "./app-header.module.css";
import { Logo } from "../logo";
import { TelegramLogo } from "../telegram";
import { WhatsappLogo } from "../whatsapp";

export const AppHeaderUI = () => (
  <header className={styles.header}>
    <nav className={styles.menu}>
      <div className={styles.logo}>
        <a href="#" className={styles.link}>
          <Logo
            fillContour="#c6c6c6"
            fillBody="#c6c6c6"
            fillBodyOnHover="greenyellow"
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
        >
          <TelegramLogo fill="#c6c6c6" />
        </a>
      </div>
      <div className={styles.icon}>
        <a
          href="https://wa.me/79111005005"
          target="_blank"
          className={styles.link}
        >
          <WhatsappLogo fill="#c6c6c6" />
        </a>
      </div>
    </nav>
  </header>
);
