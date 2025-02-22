import { FC, useState, useLayoutEffect, useRef } from "react";
import { Logo } from "../ui";
import styles from "./circles.module.css";
import {
  CircleProps,
  CircleStateOneAndFour,
  CircleStateTwoAndThree,
} from "./type";
import clsx from "clsx";
import { Parallax } from "react-scroll-parallax";

export const Circles: FC<CircleProps> = ({ text }) => {
  const [fromTop, setFromTop] = useState(0);
  const stateOneAndFour = {
    start: "0px",
    stop: "0px",
  };
  const stateTwoAndThree = {
    start: "0px",
    stop: "0px",
    opposit: "0px",
  };

  const [mooveOne, setMooveOne] =
    useState<CircleStateOneAndFour>(stateOneAndFour);
  const [mooveTwo, setMooveTwo] =
    useState<CircleStateTwoAndThree>(stateTwoAndThree);
  const [mooveThree, setMooveThree] =
    useState<CircleStateTwoAndThree>(stateTwoAndThree);
  const [mooveFour, setMooveFour] =
    useState<CircleStateOneAndFour>(stateOneAndFour);

  useLayoutEffect(() => {
    const container = document.getElementById("container");
    if (container) {
      const currentClientWidth = container.getBoundingClientRect().width;

      //вычисляем смещение относительно текущей позиции для каждого отдельно взятого элемента
      const one = document.getElementById("one");
      const two = document.getElementById("two");
      const three = document.getElementById("three");
      const four = document.getElementById("four");

      if (one) {
        const position = one.getBoundingClientRect().left;
        if (window.innerWidth > 767) {
          setMooveOne({
            start: `0px`,
            stop: `${currentClientWidth / 2 - 150 - position}px`,
          });
        } else if (window.innerWidth <= 767) {
          setMooveOne({
            start: `0px`,
            stop: `${-(currentClientWidth / 2 - 85 - 8)}px`,
          });
        }
      }

      if (two) {
        const position = two.getBoundingClientRect().left;
        if (window.innerWidth > 767) {
          setMooveTwo({
            start: `0px`,
            stop: `${currentClientWidth / 2 - 150 - position}px`,
            opposit: `0px`,
          });
        } else if (window.innerWidth <= 767) {
          setMooveTwo({
            start: `0px`,
            stop: `${-(currentClientWidth / 2 - 85 - 8)}px`,
            opposit: `${currentClientWidth / 2 - 85 - 8}px`,
          });
        }
      }

      if (three) {
        const position = three.getBoundingClientRect().left;
        if (window.innerWidth > 767) {
          setMooveThree({
            start: `0px`,
            stop: `${currentClientWidth / 2 - 150 - position}px`,
            opposit: `0px`,
          });
        } else if (window.innerWidth <= 767) {
          setMooveThree({
            start: `0px`,
            stop: `${currentClientWidth / 2 - 85 - 8}px`,
            opposit: `${-(currentClientWidth / 2 - 85  - 8)}px`,
          });
        }
      }

      if (four) {
        const position = four.getBoundingClientRect().left;

        if (window.innerWidth > 767) {
          setMooveFour({
            start: `0px`,
            stop: `${currentClientWidth / 2 - 150 - position}px`,
          });
        } else if (window.innerWidth <= 767) {
          setMooveFour({
            start: `0px`,
            stop: `${currentClientWidth / 2 - 85 - 8}px`,
          });
        }
      }

      //вычисляем точку, когда надо запускать анимацию
      const currentClientHeight = window.innerHeight;
      const containerPosition = container.getBoundingClientRect().top;
      const containerCenter = container.getBoundingClientRect().height / 2;

      if (window.innerWidth > 767) {
        if (containerPosition + 150 < currentClientHeight / 2) {
          console.log("case1")
          setFromTop(0); //вот тут проработать
        } else {
          console.log("case2")
          setFromTop(containerPosition + 150 - currentClientHeight / 2);
        }
      } else if (window.innerWidth <= 767) {
        if ((containerCenter + containerPosition)< currentClientHeight / 2) {
          console.log("case3")
          
          setFromTop(0); //вот тут проработать
        } else {
          console.log("case4")

          console.log("containerPosition " + containerPosition);
          console.log("containerCenter " + containerCenter);
          console.log("высота" + currentClientHeight);
          setFromTop(
            containerPosition + containerCenter - currentClientHeight / 2,
          );
        }
      }
    }
  }, []);

  //для больших экранов
  if (window.innerWidth > 767) {
    return (
      <div className={styles.circles}>
        <Parallax
          id="container"
          translateY={[`0px`, `1000px`]}
          startScroll={fromTop}
          endScroll={fromTop + 1000}
          className={styles.moove}
        >
          <Parallax
            id="one"
            className={clsx(styles.circle, styles.one)}
            translateX={[mooveOne.start, mooveOne.stop]}
            startScroll={fromTop + 300}
            endScroll={fromTop + 600}
          >
            <p className={styles.text}>{text[0]}</p>
          </Parallax>
          <Parallax
            id="two"
            className={clsx(styles.circle, styles.two)}
            translateX={[mooveTwo.start, mooveTwo.stop]}
            startScroll={fromTop}
            endScroll={fromTop + 300}
          >
            <p className={styles.text}>{text[1]}</p>
          </Parallax>
          <Parallax
            id="three"
            className={clsx(styles.circle, styles.three)}
            translateX={[mooveThree.start, mooveThree.stop]}
            startScroll={fromTop}
            endScroll={fromTop + 300}
          >
            <p className={styles.text}>{text[2]}</p>
          </Parallax>
          <Parallax
            id="four"
            className={clsx(styles.circle, styles.four)}
            translateX={[mooveFour.start, mooveFour.stop]}
            startScroll={fromTop + 300}
            endScroll={fromTop + 600}
          >
            <p className={styles.text}>{text[3]}</p>
          </Parallax>
          <Parallax
            className={clsx(styles.circle, styles.five)}
            opacity={[0, 1]}
            startScroll={fromTop + 550}
            endScroll={fromTop + 800}
          >
            <div className={styles.logo}>
              <Logo
                fill="var(--main-color)"
                fillOnHover="var(--main-color)"
               />
            </div>
          </Parallax>
        </Parallax>
      </div>
    );
  } else if (window.innerWidth <= 767) {
    //для маленьких экранов
    return (
      <div className={styles.circles}>
        <Parallax
          id="container"
          translateY={[`0px`, `1000px`]}
          startScroll={fromTop}
          endScroll={fromTop + 1000}
          className={styles.moove}
        >
          <Parallax
            id="one"
            className={clsx(styles.circle, styles.one)}
            translateX={[mooveOne.start, mooveOne.stop]}
            translateY={[mooveOne.start, mooveOne.stop]}
            startScroll={fromTop + 300}
            endScroll={fromTop + 600}
          >
            <p className={styles.text}>{text[0]}</p>
          </Parallax>
          <Parallax
            id="two"
            className={clsx(styles.circle, styles.two)}
            translateX={[mooveTwo.start, mooveTwo.stop]}
            translateY={[mooveTwo.start, mooveTwo.opposit]}
            startScroll={fromTop + 300}
            endScroll={fromTop + 600}
          >
            <p className={styles.text}>{text[1]}</p>
          </Parallax>
          <Parallax
            id="three"
            className={clsx(styles.circle, styles.three)}
            translateX={[mooveThree.start, mooveThree.stop]}
            translateY={[mooveThree.start, mooveThree.opposit]}
            startScroll={fromTop + 300}
            endScroll={fromTop + 600}
          >
            <p className={styles.text}>{text[2]}</p>
          </Parallax>
          <Parallax
            id="four"
            className={clsx(styles.circle, styles.four)}
            translateX={[mooveFour.start, mooveFour.stop]}
            translateY={[mooveFour.start, mooveFour.stop]}
            startScroll={fromTop + 300}
            endScroll={fromTop + 600}
          >
            <p className={styles.text}>{text[3]}</p>
          </Parallax>
          <Parallax
            className={clsx(styles.circle, styles.five)}
            opacity={[1, 0]}
            startScroll={fromTop}
            endScroll={fromTop + 600}
          >
            <div className={styles.logo}>
              <Logo
                fill="var(--main-color)"
                fillOnHover="var(--main-color)"                
              />
            </div>
          </Parallax>
        </Parallax>
      </div>
    );
  }
};
