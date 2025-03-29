import { FC } from 'react';
import styles from "./intro.module.css";
import { IntroProps } from './type';

export const Intro: FC<IntroProps> =  ({ title, text }) => (
  <section className={styles.container} id="intro">
    <h1 className={styles.title}>
    {title}
    </h1>
    <p className={styles.text}>{text}</p>
    <div className={styles.flash}></div>
  </section>
);
