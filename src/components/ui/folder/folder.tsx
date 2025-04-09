import { FC, useEffect, useRef } from 'react';
import styles from './folder.module.css';
import { FolderUIProps } from './type';

export const FolderUI: FC<FolderUIProps> = ({
  title,
  startScroll = 0,
  top,
  left,
  zIndex,
}) => {
  const folderRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Определение мобильных устройств
  const isMobile = typeof window !== 'undefined' 
    ? window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    : false;

  useEffect(() => {
    const updateAnimation = () => {
      if (!folderRef.current) return;

      const scrollY = window.scrollY;
      const scrollPosition = Math.max(scrollY - startScroll, 0);
      const animationLength = isMobile ? 300 : 200;
      const progress = Math.min(scrollPosition / animationLength, 1);

      // Применяем стили непосредственно к элементу
      const element = folderRef.current;
      element.style.transform = `translateY(${progress * 200}px)`;
      element.style.opacity = `${1 - progress}`;
    };

    const handleScroll = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(updateAnimation);
    };

    // Инициализация начального состояния
    updateAnimation();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [startScroll, isMobile]);

  return (
    <div
      ref={folderRef}
      className={styles.container}
      style={{
        '--top-folder': `${top}px`,
        '--left-folder': `${left}px`,
        '--z-index-folder': zIndex,
        transform: 'translateY(0)',
        opacity: 1,
        willChange: 'transform, opacity',
        WebkitBackfaceVisibility: 'hidden',
        WebkitTransformStyle: 'preserve-3d',
      } as React.CSSProperties}
    >
      <svg className={styles.svg} viewBox="0 0 376 255">
        <path
          className={styles.path}
          d="M127 13.081C127 5.857 121.143 0 113.919 0H23.916C10.707 0 0 10.707 0 23.916V219c0 19.882 16.118 36 36 36h304c19.882 0 36-16.118 36-36V54c0-14.912-12.088-27-27-27H140.919C133.232 27 127 20.768 127 13.081Z"
        />
        <path
          className={styles.path}
          d="M113.919.5c6.948 0 12.581 5.633 12.581 12.581 0 7.964 6.455 14.419 14.419 14.419H349c14.636 0 26.5 11.864 26.5 26.5v165c0 19.606-15.894 35.5-35.5 35.5H36C16.394 254.5.5 238.606.5 219V23.916C.5 10.983 10.983.5 23.916.5h90.003Z"
        />
      </svg>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};