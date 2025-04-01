import { FC, useEffect, useRef, useState, useCallback } from 'react';
import styles from './beating-heart.module.css';
import { HeardSvg } from '../svg';
import { BeatingHeartUIProps } from './type';

export const BeatingHeartUI: FC<BeatingHeartUIProps> = ({ start, className }) => {
  const heartRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Отменяем предыдущий кадр анимации, если он был
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const shouldBeActive = scrollPosition > start;
      
      setIsActive(prev => prev !== shouldBeActive ? shouldBeActive : prev);
    });
  }, [start]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Вызываем обработчик сразу для начального состояния
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll]);

  const heartClasses = `${styles.heart} ${isActive ? styles.beat : ''} ${className || ''}`.trim();

  return (
    <div ref={heartRef} className={heartClasses}>
      <HeardSvg />
    </div>
  );
};