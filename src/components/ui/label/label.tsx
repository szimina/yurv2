import { FC, useState, useEffect, useRef, useCallback, useLayoutEffect, Ref } from 'react'
import { Parallax, useParallax } from 'react-scroll-parallax'
import styles from './label.module.css'
import { LabelUIProps, CSSEffect } from './type'

export const LabelUI: FC<LabelUIProps> = ({
  header,
  buttons,
  startScroll,
  endScroll,
  index,
}) => {
  const [screenState, setScreenState] = useState({width: 0, height: 0, moove: 0});

  const handleResize = useCallback(() => {
    const windowWidth = window.visualViewport?.width || window.innerWidth;
    const moove = windowWidth - 300;
    setScreenState({
      height: window.visualViewport?.height || window.innerHeight, 
      width: windowWidth,
      moove: moove,
    });
  }, []);

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const getOpacity = (progress: number) => {
    if (progress < 0.3) return progress / 0.3;
    if (progress <= 0.8) return 1;
    return 1 - (progress - 0.8) / 0.2;
  };

  const parallax = useParallax<HTMLDivElement>({
    translateX: ['0px', `-${screenState.moove}px`],
    startScroll,
    endScroll,
    opacity: [0, 1, 'easeOutBack'],
    onProgressChange: (progress) => {
      let scale;
      if (progress < 0.3) scale = progress / 0.3;
      else if (progress <= 0.8) scale = 1;
      else scale = 1 - (progress - 0.8) / 0.2;
      
      parallax.ref.current.style.scale = scale.toString();
    },
  });


  return (
    <div
      ref={parallax.ref}
      className={styles.container}
    >
      <div className={styles.circle} />
      <h3 className={styles.header}>{header}</h3>
      <div className={styles.buttons}>
        {buttons.map((button, i) => (
          <p key={i} className={styles.label}>{button}</p>
        ))}
      </div>
    </div>
  );
};