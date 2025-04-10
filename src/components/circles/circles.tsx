import { useRef, useState, useLayoutEffect, memo, useCallback, useMemo } from 'react';
import styles from './circles.module.css';
import { Parallax } from 'react-scroll-parallax';
import { ScrollYContainerUI, CircleUI, LogoUI } from '../ui';

const CIRCLE_TEXT = [
  'Законность и прозрачность',
  'Комплексный подход',
  'Экономия времени и нервов',
  'Защита от коллекторов',
];

const Circles = memo(() => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({
    windowWidth: 0,
    windowHeight: 0,
    circleDiameter: 300,
  });

  const [state, setState] = useState({
    left: [0, 350, 700, 900, 500],
    mooveX: [0, 0, 0, 0],
    mooveY: [0, 0, 0, 0],
    startScroll: [0, 0, 0, 0, 0],
    endScroll: [0, 0, 0, 0, 0],
    logoOpacity: [0, 0] as [number, number],
  });

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

    const circleDiameter = isMobileView
      ? (windowWidth - 10) / 2
      : Math.min(windowWidth / 4 - 10, 450);

    setDimensions({
      windowWidth,
      windowHeight: realWindowHeight,
      circleDiameter,
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

  const { left, mooveX, mooveY } = useMemo(() => {
    const { circleDiameter, windowWidth } = dimensions;
    const containerWidth = containerRef.current?.getBoundingClientRect().width || 0;
    const gap = (windowWidth - circleDiameter * 4) / 3;
    const leftOne = (containerWidth - windowWidth) / 2;
    const center = containerWidth / 2 - circleDiameter / 2;

    if (isMobile) {
      const mooveXMobile = (windowWidth - circleDiameter) / 2 - 3;
      const mooveYValue = circleDiameter * 0.7;
      
      return {
        left: Array(5).fill(center),
        mooveX: [-mooveXMobile, mooveXMobile, -mooveXMobile, mooveXMobile],
        mooveY: [-mooveYValue, -mooveYValue, mooveYValue, mooveYValue],
      };
    }

    const leftTwo = leftOne + circleDiameter + gap;
    const leftThree = leftTwo + circleDiameter + gap;
    const leftFour = leftThree + circleDiameter + gap;
    const mooveXFar = (windowWidth - circleDiameter) / 2;
    const mooveXClose = mooveXFar - circleDiameter - gap;

    return {
      left: [leftOne, leftTwo, leftThree, leftFour, center],
      mooveX: [mooveXFar, mooveXClose, -mooveXClose, -mooveXFar],
      mooveY: [0, 0, 0, 0],
    };
  }, [isMobile, dimensions]);

  const marginTop = useMemo(
    () => dimensions.windowHeight / 2 - dimensions.circleDiameter / 2,
    [dimensions]
  );

  useLayoutEffect(() => {
    setState(prev => ({
      ...prev,
      left,
      mooveX,
      mooveY,
    }));
  }, [left, mooveX, mooveY]);

  const handleTouchPositionChange = useCallback(
    (touchPosition: number) => {
      if (isMobile) {
        const value = Array(5).fill(touchPosition);
        setState(prev => ({
          ...prev,
          startScroll: value,
          endScroll: value.map(v => v + 280 * 4),
        }));
      } else {
        setState(prev => ({
          ...prev,
          startScroll: [
            touchPosition + 280 * 2 - 100,
            touchPosition,
            touchPosition,
            touchPosition + 280 * 2 - 100,
            touchPosition + 280 * 4,
          ],
          endScroll: [
            touchPosition + 280 * 4,
            touchPosition + 280 * 2,
            touchPosition + 280 * 2,
            touchPosition + 280 * 4,
            touchPosition + 280 * 5,
          ],
        }));
      }
    },
    [isMobile]
  );

  const circleCommonProps = {
    size: dimensions.circleDiameter,
    top: marginTop,
  };

  return (
    <ScrollYContainerUI
      height={2000}
      stop={2000 - dimensions.circleDiameter - marginTop}
      ref={containerRef}
      marginTop={-marginTop}
      onTouchPositionChange={handleTouchPositionChange}
    >
      {[0, 1, 2, 3].map(index => (
        <CircleUI
          key={index + 1}
          {...circleCommonProps}
          index={index + 1}
          text={CIRCLE_TEXT[index]}
          left={left[index]}
          translateX={['0px', `${mooveX[index]}px`, 'easeInCubic']}
          translateY={['0px', `${mooveY[index]}px`, 'easeIn']}
          startScroll={state.startScroll[index]}
          endScroll={state.endScroll[index]}
        />
      ))}

      <Parallax
        className={styles.circle}
        style={{
          height: `${dimensions.circleDiameter}px`,
          width: `${dimensions.circleDiameter}px`,
          borderRadius: `${dimensions.circleDiameter}px`,
          zIndex: 5,
          top: `${marginTop}px`,
          left: `${left[4]}px`,
        }}
        startScroll={state.startScroll[4]}
        endScroll={state.endScroll[4]}
        opacity={state.logoOpacity}
      >
        <div style={{ height: '100px', width: '100px', zIndex: 6 }}>
          <LogoUI fill='var(--main-color)' fillOnHover='var(--main-color)' />
        </div>
      </Parallax>
    </ScrollYContainerUI>
  );
});

export default Circles;