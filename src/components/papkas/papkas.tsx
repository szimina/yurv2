import { useRef, useState, useLayoutEffect, memo, useCallback, useMemo, useEffect } from 'react';
import styles from './papkas.module.css';
import { Parallax } from 'react-scroll-parallax';
import { ScrollYContainerUI, CircleUI, LogoUI } from '../ui';
import { PapkaUI } from '../ui/papka';
import { useScrollPosition } from '../../utils/useScrollPosition';

const FOLDERS_TEXT = [
	'Консультация',
	'Анализ долгов',
	'Сбор документов',
	'Подача заявления',
	'Судебное сопровождение',
	'Взаимодействие с кредиторами',
	'Реализация имущества',
	'Завершение процедуры',
]

const Papkas = memo(() => {
  const papkasRef = useRef<HTMLDivElement>(null!);
  const start = useScrollPosition(papkasRef) + 400




  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({
    windowWidth: 0,
    windowHeight: 0,
    // circleDiameter: 300,
  });

  const [state, setState] = useState({
    left: [0, 350, 700, 900, 300, 500, 800, 900],
    top: [300, 320, 400, 350, 380, 3000, 330, 360],
    startScroll: [0, 0, 0, 0, 0, 0, 0, 0],
    endScroll: [0, 0, 0, 0, 0, 0, 0, 0],
    zIndex: [8, 7, 6, 5, 4, 3, 2, 1],
  });


  useEffect(() => {
    setState((prev) => ({
      ...prev,
      startScroll: [start + 200, start + 400, start + 600, start + 800, start + 1000, start + 1200, start + 1400, start + 1600],
      endScroll: [start + 400, start + 600, start + 800, start + 1000, start + 1200, start + 1400, start + 1600, start + 1800],
      }))
  }, [start]);


  
  // Calculate scrollbar width once
  const scrollbarWidth = useMemo(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--scrollbar-width')
      .trim();
    return Number(value.replace(/\D/g, ''));
  }, []);

  const handleResize = useCallback(() => {
    const realWindowWidth = window.visualViewport?.width || window.innerWidth;
    const realWindowHeight = window.visualViewport?.height || window.innerHeight;
    const windowWidth = realWindowWidth - scrollbarWidth;
    const isMobileView = window.matchMedia(`(max-width: ${767 - scrollbarWidth}px)`).matches;

    setIsMobile(isMobileView);

    // const circleDiameter = isMobileView
    //   ? (windowWidth - 10) / 2
    //   : Math.min(windowWidth / 4 - 10, 450);

    setDimensions({
      windowWidth,
      windowHeight: realWindowHeight,
      // circleDiameter,
    });

    setState(prev => ({
      ...prev,
      logoOpacity: isMobileView ? [1, 0] : [0, 1],
    }));
  }, [scrollbarWidth]);

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);





  // useLayoutEffect(() => {
  //   setState(prev => ({
  //     ...prev,
  //     left,
  //     mooveY,
  //   }));
  // }, [left, mooveY]);

  // const handleTouchPositionChange = useCallback(
  //   (touchPosition: number) => {
  //     if (isMobile) {
  //       const value = Array(5).fill(touchPosition);
  //       setState(prev => ({
  //         ...prev,
  //         startScroll: value,
  //         endScroll: value.map(v => v + 280 * 4),
  //       }));
  //     } else {
  //       setState(prev => ({
  //         ...prev,
  //         startScroll: [
  //           touchPosition + 280 * 2 - 100,
  //           touchPosition,
  //           touchPosition,
  //           touchPosition + 280 * 2 - 100,
  //           touchPosition + 280 * 4,
  //         ],
  //         endScroll: [
  //           touchPosition + 280 * 4,
  //           touchPosition + 280 * 2,
  //           touchPosition + 280 * 2,
  //           touchPosition + 280 * 4,
  //           touchPosition + 280 * 5,
  //         ],
  //       }));
  //     }
  //   },
  //   [isMobile]
  // );



  return (
    <ScrollYContainerUI
      height={2500}
      stop={1900}
      ref={papkasRef}
      // onTouchPositionChange={handleTouchPositionChange}
    >
      <div
				className={styles.header}
				style={{ marginTop: '100px' }}
			>
				8 этапов работы нашей компании{' '}
				<span
					data-text='с клиентами'
				>
					с клиентами
				</span>
			</div>
      {FOLDERS_TEXT.map((text, index) => (
        <PapkaUI
          key={text}
          size={200}
          top={state.top[index]}
          index={index + 1}
          text={FOLDERS_TEXT[index]}
          left={state.left[index]}
          translateY={['0px', `-200px`, 'easeIn']}
          startScroll={state.startScroll[index]}
          endScroll={state.endScroll[index]}
          zIndex={state.zIndex[index]}
        />
      ))}

    </ScrollYContainerUI>
  );
});

export default Papkas;