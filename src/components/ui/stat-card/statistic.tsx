import { FC, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import styles from './statistic.module.css';
import { StatisticCardUIProps } from './type';
import { abracadabraPhraseGenerator } from '../../../utils/abracadabraGenerator';

export const StatisticCardUI: FC<StatisticCardUIProps> = ({
  stroke,
  header,
  text,
}) => {
  // Мемоизированные значения для заголовка
  const { headerNumberValue, symbol, symbolPosition } = useMemo(() => {
    const numberValue = parseFloat(header.replace(/\D/g, ''));
    const symbolChars = header.replace(/\d/g, '');
    const position = 
      header.indexOf(symbolChars) === 0
        ? 'start'
        : header.indexOf(symbolChars) === header.length - symbolChars.length
        ? 'end'
        : 'none';
    
    return {
      headerNumberValue: numberValue,
      symbol: symbolChars,
      symbolPosition: position
    };
  }, [header]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentHeaderValue, setCurrentHeaderValue] = useState(0);
  const [currentText, setCurrentText] = useState(() => abracadabraPhraseGenerator(text));

  // Форматирование значения с мемоизацией
  const formatValue = useCallback((value: number) => {
    switch (symbolPosition) {
      case 'start':
        return `${symbol}${value}`;
      case 'end':
        return `${value}${symbol}`;
      default:
        return `${value}`;
    }
  }, [symbol, symbolPosition]);

  // Intersection Observer для ленивой загрузки
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Анимация числового значения
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1000;
    const startTime = performance.now();
    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * headerNumberValue);
      
      setCurrentHeaderValue(value);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, headerNumberValue]);

  // Анимация текста
  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index >= text.length) {
        clearInterval(interval);
        return;
      }

      setCurrentText(prev => 
        text.slice(0, index + 1) + prev.slice(index + 1)
      );
      index++;
    }, 30);

    return () => clearInterval(interval);
  }, [isVisible, text]);

  return (
    <div className={styles.container} ref={containerRef}>
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 347 239'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={styles.svg}
        aria-hidden="true"
      >
        <g opacity='0.3'>
          <path
            d='M9.54492 30C9.54492 19.2305 18.2754 10.5 29.0449 10.5H325.625C336.604 10.5 345.415 19.5271 345.098 30.4983C344.268 59.1425 342.716 110.108 341.567 132.474C340.474 153.735 340.832 191.515 341.196 214.504C341.364 225.095 333.159 233.913 322.585 234.333C302.2 235.143 268.958 236.288 238.389 236.554C223.104 236.687 208.492 236.601 196.492 236.143C184.472 235.684 175.129 234.854 170.345 233.518C165.553 232.181 156.824 231.358 145.866 230.893C134.89 230.428 121.627 230.319 107.736 230.427C79.9518 230.643 49.6339 231.724 30.0314 232.543C18.8746 233.009 9.54492 224.108 9.54492 212.945V30Z'
            stroke={stroke}
            className={styles.path}
          />
          <path
            d='M0.5 22.6408C0.5 11.6288 9.55409 2.79283 20.5615 3.07809C40.7991 3.60255 72.8598 4.31655 102.333 4.47014C117.07 4.54693 131.162 4.48364 142.809 4.18634C154.442 3.88935 163.669 3.35834 168.652 2.49262C173.603 1.63246 182.898 1.0995 194.716 0.804084C206.521 0.508978 220.808 0.451399 235.721 0.534858C265.546 0.701774 297.861 1.43273 317.801 1.95427C328.324 2.22949 336.633 10.8469 336.633 21.3791V206C336.633 216.77 327.902 225.5 317.133 225.5H20C9.23044 225.5 0.5 216.77 0.5 206V22.6408Z'
            stroke={stroke}
            className={styles.path}
          />
          <path
            d='M9.19245 33.577C9.77277 23.3807 18.2426 15.5 28.4642 15.5H327C337.77 15.5 346.5 24.2304 346.5 35V219C346.5 229.77 337.77 238.5 327 238.5H31.3764C20.0495 238.5 11.0794 228.906 11.7025 217.588C12.5085 202.95 13.3944 183.091 13.4687 165.493C13.5059 156.694 13.3402 148.453 12.8591 141.709C12.3799 134.99 11.5841 129.681 10.3255 126.8C9.10488 124.005 8.30051 118.603 7.82568 111.536C7.35268 104.496 7.21013 95.8834 7.27624 86.7247C7.40847 68.4087 8.37492 47.941 9.19245 33.577Z'
            stroke={stroke}
            className={styles.path}
          />
        </g>
      </svg>

      <div className={styles.content}>
        <div className={styles.header} aria-live="polite">
          {formatValue(currentHeaderValue)}
        </div>
        <div className={styles.text} aria-live="polite">
          {currentText}
        </div>
      </div>
    </div>
  );
};