import { FC } from 'react';
import styles from "./circle.module.css";
import { CircleUIProps } from "./type";

export const CircleUI:FC<CircleUIProps>  = ({ text }) => (
  <>
    <div className={styles.circle}>
      <p className={styles.text}>{text}</p>
    </div>
  </>
);
