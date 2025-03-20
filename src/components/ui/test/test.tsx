import  { FC, useRef, useState, useEffect } from 'react';
import styles from './test.module.css'
import { AnimatedHeaderProps } from './type';

const Header: FC<AnimatedHeaderProps> = ({ text }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // Прогресс анимации (от 0 до 1)

  useEffect(() => {
    const headerElement = headerRef.current;

    // Функция для обновления прогресса анимации
    const handleScroll = () => {
      if (headerElement) {
        const rect = headerElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight * 10;
        const elementHeight = rect.height;

        // Вычисляем прогресс анимации
        const visibleHeight = Math.min(viewportHeight, rect.bottom) - Math.max(0, rect.top);
        const newProgress = Math.max(0, Math.min(1, visibleHeight / elementHeight));
        setProgress(newProgress);
      }
    };

    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Инициализация при монтировании

    // Убираем обработчик при размонтировании
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <h1
      ref={headerRef}
      className={styles.header}
      style={{ '--progress': progress } as React.CSSProperties} // Передаем прогресс в CSS
    >
      {text}
    </h1>
  );
};

export default Header;