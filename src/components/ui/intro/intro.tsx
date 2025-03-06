import { FC } from 'react';
import styles from "./intro.module.css";
import { IntroUIProps } from './type';

export const Intro: FC<IntroUIProps> =  ({ title, text }) => (
  <section className={styles.intro} id="intro">
    <h1 className={styles.title}>
    {title}
    </h1>
    <p className={styles.text}>{text}</p>
    <div className={styles.flash}></div>
  </section>
);
