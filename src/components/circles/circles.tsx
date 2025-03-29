import { useRef, useState, useLayoutEffect, memo, useCallback, useMemo } from 'react';
import styles from './circles.module.css';
import { Parallax } from 'react-scroll-parallax';
import { ScrollYContainer, CircleUI, Logo } from '../ui';

export const Circles = () => {
  const [mobile, setMobile] = useState(false);
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

  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const scrollbarWidthValue = getComputedStyle(document.documentElement)
      .getPropertyValue('--scrollbar-width')
      .trim();
    const scrollbarWidth = Number(scrollbarWidthValue.replace(/\D/g, ''));

    const handleResize = () => {
      const realWindowWidth = window.visualViewport?.width || window.innerWidth;
      const realWindowHeight = window.visualViewport?.height || window.innerHeight;
      const windowWidth = realWindowWidth - scrollbarWidth;

      const mediaQuery = window.matchMedia(`(max-width: ${767 - scrollbarWidth}px)`);
      setMobile(mediaQuery.matches);

      setDimensions({
        windowWidth,
        windowHeight: realWindowHeight,
        circleDiameter: !mediaQuery.matches
          ? windowWidth / 4 - 10 > 450
            ? 450
            : windowWidth / 4 - 10
          : (windowWidth - 10) / 2,
      });

      setState((prev) => ({
        ...prev,
        logoOpacity: mediaQuery.matches ? [1, 0] : [0, 1],
      }));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { left, mooveX, mooveY } = useMemo(() => {
    const containerWidth = containerRef.current?.getBoundingClientRect().width || 0;
    const gap = (dimensions.windowWidth - dimensions.circleDiameter * 4) / 3;
    const leftOne = (containerWidth - dimensions.windowWidth) / 2;
    const leftTwo = leftOne + dimensions.circleDiameter + gap;
    const leftThree = leftTwo + dimensions.circleDiameter + gap;
    const leftFour = leftThree + dimensions.circleDiameter + gap;
    const center = containerWidth / 2 - dimensions.circleDiameter / 2;

    const mooveXFar = (dimensions.windowWidth - dimensions.circleDiameter) / 2;
    const mooveXClose = mooveXFar - dimensions.circleDiameter - gap;
    const mooveXMobile = (dimensions.windowWidth - dimensions.circleDiameter) / 2 - 3;

    if (mobile) {
      return {
        left: [center, center, center, center, center],
        mooveX: [-mooveXMobile, mooveXMobile, -mooveXMobile, mooveXMobile],
        mooveY: [
          -dimensions.circleDiameter * 0.7,
          -dimensions.circleDiameter * 0.7,
          dimensions.circleDiameter * 0.7,
          dimensions.circleDiameter * 0.7,
        ],
      };
    } else {
      return {
        left: [leftOne, leftTwo, leftThree, leftFour, center],
        mooveX: [mooveXFar, mooveXClose, -mooveXClose, -mooveXFar],
        mooveY: [0, 0, 0, 0],
      };
    }
  }, [mobile, dimensions]);

  const marginTop = useMemo(() => {
    return dimensions.windowHeight / 2 - dimensions.circleDiameter / 2;
  }, [dimensions.windowHeight, dimensions.circleDiameter]);

  useLayoutEffect(() => {
    setState((prev) => ({
      ...prev,
      left,
      mooveX,
      mooveY,
    }));
  }, [left, mooveX, mooveY]);

  const handleTouchPositionChange = useCallback((touchPosition: number) => {
    if (mobile) {
      setState((prev) => ({
        ...prev,
        startScroll: Array(5).fill(touchPosition),
        endScroll: Array(5).fill(touchPosition + 280 * 4),
      }));
    } else {
      setState((prev) => ({
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
  }, [mobile]);

  return (
    <ScrollYContainer
      height={2000}
      stop={2000 - dimensions.circleDiameter - marginTop}
      ref={containerRef}
      marginTop={-marginTop}
      onTouchPositionChange={handleTouchPositionChange}
    >
      {[1, 2, 3, 4].map((index) => (
        <CircleUI
          key={index}
          size={dimensions.circleDiameter}
          index={index}
          text={[
            'Законность и прозрачность',
            'Комплексный подход',
            'Экономия времени и нервов',
            'Защита от коллекторов',
          ][index - 1]}
          top={marginTop}
          left={left[index - 1]}
          translateX={['0px', `${mooveX[index - 1]}px`, 'easeInCubic']}
          translateY={['0px', `${mooveY[index - 1]}px`, 'easeIn']}
          startScroll={state.startScroll[index - 1]}
          endScroll={state.endScroll[index - 1]}
        />
      ))}
      <Parallax
        className={styles.circle}
        style={{
          height: `${dimensions.circleDiameter}px`,
          width: `${dimensions.circleDiameter}px`,
          borderRadius: `${dimensions.circleDiameter}px`,
          zIndex: `5`,
          top: `${marginTop}px`,
          left: `${left[4]}px`,
        }}
        startScroll={state.startScroll[4]}
        endScroll={state.endScroll[4]}
        opacity={state.logoOpacity}
      >
        <div style={{ height: '100px', width: '100px', zIndex: '6' }}>
          <Logo fill='var(--main-color)' fillOnHover='var(--main-color)' />
        </div>
      </Parallax>
    </ScrollYContainer>
  );
};