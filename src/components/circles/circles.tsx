import { FC, useState, useEffect } from "react";
import { CircleUI } from "../ui";
import styles from "./circles.module.css";
import { CircleProps } from "./type";
import clsx from "clsx";
import { isElementInViewport } from "../../utils/isElementInViewport";

export const Circles: FC<CircleProps> = ({ text }) => {

  const windowWidth = document.documentElement.clientWidth
  // const scroll = window.scrollY;
  const element = document.getElementById('circles');

  const [elementVisible, setVisibility] = useState(false);
  const [scroll, isScrolling] = useState(false);

  
    // if (isElementInViewport(element as HTMLElement)) {
    //   setElementVisible('true')
    //   console.log(elementVisible)
    // }
  
 
  useEffect(() => {
    let timeout: NodeJS.Timeout
  
    const handleScroll = () => {
      if (timeout) {
        clearTimeout(timeout)
      }
  
      timeout = setTimeout(() => {
        if (!isScrolling) {
          const section = document.querySelector('.circles')
          // sections.forEach(section => {
            if (isElementInViewport(section as HTMLElement)) {
              console.log("попал в поле зрения")
              console.log(elementVisible)
              setVisibility(true)
            }
          // })
        }
      }, 100)
    }
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling]);

  
  
  // if (one){
  //   const circleWidth = one.getBoundingClientRect().width; 
  //   const centerX = document.documentElement.clientWidth / 2 - circleWidth;
  //   const positionOneAndFour = centerX - circleWidth/2
  //   const positionTwoAndThree = centerX + circleWidth*1.5
  //   console.log(circleWidth)
  // }


  return   <div className={styles.circles} id='circles'>
  <div className={clsx(styles.circle, styles.one)}>
    <p className={styles.text}>{text[0]}</p>
  </div>
  <div className={clsx(styles.circle, styles.two)}>
    <p className={styles.text}>{text[1]}</p>
  </div>
  <div className={clsx(styles.circle, styles.three)}>
    <p className={styles.text}>{text[2]}</p>
  </div>
  <div className={clsx(styles.circle, styles.four)}>
    <p className={styles.text}>{text[3]}</p>
  </div>
</div>

}

  
