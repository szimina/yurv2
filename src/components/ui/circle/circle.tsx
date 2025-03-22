import { FC, useState, useLayoutEffect } from "react";

import styles from "./circle.module.css";
import { CircleUIProps } from "./type";
import { Parallax } from "react-scroll-parallax";

export const CircleUI: FC<CircleUIProps> = ({ text, index, size, top=0, left=0, translateX=[0, 0, 'easeInOutCubic'], translateY=[0, 0, 'easeInOutCubic'], startScroll=0, endScroll=0}) => {


  return(
    <Parallax
        className={styles.circle}
        style={{height: `${size}px`, width: `${size}px`, borderRadius: `${size}px`, top: `${top}px`, left: `${left}px`, zIndex: `${index}`}}
        translateX={translateX}
        translateY={translateY}
        startScroll={startScroll}
        endScroll={endScroll}
    >
    <p className={styles.text}>{text}</p>
  </Parallax>
  )
}
