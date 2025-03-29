import { FC, useEffect, useRef, useState } from 'react';
import styles from './beating-heart.module.css';
import { HeardSvg } from '../svg';
import { BeatingHeartProps } from './type';

export const BeatingHeart: FC<BeatingHeartProps> = ({ start, className }) => {
  const heartRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const shouldBeActive = scrollPosition > start;
      
      if (shouldBeActive !== isActive) {
        setIsActive(shouldBeActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isActive, start]);

  // Формируем классы динамически
  const heartClasses = `${styles.heart} ${isActive ? styles.beat : ''} ${className}`;

  return (
    <div ref={heartRef} className={heartClasses}>
      <HeardSvg />
    </div>
  );
};