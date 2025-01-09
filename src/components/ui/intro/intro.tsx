import { FC } from 'react';
import styles from "./intro.module.css";
import { IntroUIProps } from './type';

export const IntroUI: FC<IntroUIProps> =  ({ title, text }) => (
  <section className={styles.intro}>
    <h1 className={styles.title}>
    {title}
    </h1>
    <p className={styles.text}>{text}</p>
    <div className={styles.gradient}></div>
  </section>
);
