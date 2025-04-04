import { CardUIProps } from "./type";
import { FC } from 'react';
import styles from "./card.module.css";
import { useParallax } from "react-scroll-parallax";
import useWindowHeight from "../../../utils/useWindowHeight";

export const CardUI: FC<CardUIProps> = ({ header, text, color, background, rotate, startScroll }) => {
  // Определяем стиль для фона
  const sectionStyle = {
    background: background || undefined, // Если background передан, используем его, иначе undefined
    color: color,
  };

  const windowHeight = useWindowHeight();

  const parallax= useParallax<HTMLDivElement>({
      translateY: startScroll ? ['500px', '0px', 'easeOut'] : [0, 0],
      startScroll: startScroll? startScroll - windowHeight / 3: 0, 
      endScroll: startScroll? startScroll + windowHeight / 2: 0,
      easing: 'easeOut',
      rotate: rotate,
      shouldAlwaysCompleteAnimation: true,

    })

  return (
    <section ref={parallax.ref}
      style={sectionStyle} // Применяем inline-стиль
      className={styles.card} // Всегда применяем CSS-класс
    >
      <h2 className={styles.header}>{header}</h2>
      {text.map((paragraph, index) => (
        <p key={index} className={styles.text}>{paragraph}</p>
      ))}
    </section>
  );
};