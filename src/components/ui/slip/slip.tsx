import { FC, useState, useEffect } from 'react';
import { useParallax } from 'react-scroll-parallax';
import styles from './slip.module.css';
import { SlipUIProps } from './type';

export const Slip: FC<SlipUIProps> = ({ header, buttons, startScroll, endScroll }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll >= startScroll && currentScroll <= endScroll) {
        const newProgress = (currentScroll - startScroll) / (endScroll - startScroll);
        setProgress(newProgress);
      } else if (currentScroll < startScroll) {
        setProgress(0);
      } else if (currentScroll > endScroll) {
        setProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startScroll, endScroll]);

  const opacity = progress < 0.3 
  ? progress * 100 
  : progress < 0.9 
    ? 1
    : 1 - progress; 

  const distance = window.innerWidth - 350  
  
  const translateX = 
  progress < 0.3 
    ? -progress * distance *2 
    : progress < 0.9 
      ? -0.3 * distance 
      : -progress * distance; 
      
  const scale = progress < 0.3 
  ? progress  
  : progress < 0.9 
    ? 1.1
    : 1 - progress; 


  return (
    <div
      className={styles.container}
      style={{
        opacity: opacity,
        transform: `translateX(${translateX}px) scale(${scale})`,
        transition: 'opacity 0.3s, transform 0.3s',
      }}
    >
      <div className={styles.circle}></div>
      <h3 className={styles.header}>{header}</h3>
      <div className={styles.buttons}>
        {buttons.map((button, index) => (
          <p key={index} className={styles.label}>
            {button}
          </p>
        ))}
      </div>
    </div>
  );
};