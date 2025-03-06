import { CardUIProps } from "./type";
import { FC } from 'react';
import styles from "./card.module.css";
import { useParallax } from "react-scroll-parallax";

export const CardUI: FC<CardUIProps> = ({ header, text, color, background, rotate, startScroll }) => {
  // Определяем стиль для фона
  const sectionStyle = {
    background: background || undefined, // Если background передан, используем его, иначе undefined
    color: color,
  };

  const parallax= useParallax<HTMLDivElement>({
      translateY: startScroll ? ['500px', '0px', 'easeOut'] : [0, 0],
      startScroll: startScroll? startScroll - window.innerHeight / 3: 0, 
      endScroll: startScroll? startScroll + window.innerHeight / 2: 0,
      easing: 'easeOut',
      rotate: rotate,
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