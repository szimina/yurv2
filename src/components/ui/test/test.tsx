import React, { useState, useEffect, useRef } from 'react';

const StickyContainer = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [offset, setOffset] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null); // Ref для родительского контейнера

  useEffect(() => {
    const handleScroll = () => {
      const parent = parentRef.current;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const parentOffsetTop = parent.offsetTop;

      // 1. Проверяем, достиг ли верхний край родителя верха экрана
      if (parentRect.top <= 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // 2. Вычисляем, насколько родительский контейнер уехал за верхнюю границу экрана
      const scrollOffset = scrollTop - parentOffsetTop;

      // 3. Если прокручено больше 600px, начинаем двигать синий контейнер вверх
      if (scrollOffset > 600) {
        setOffset(scrollOffset - 600);
      } else {
        setOffset(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={parentRef}
      style={{ height: '1000px', position: 'relative', border: '1px solid pink' }}
    >
      <div
        style={{
          height: '200px',
          width: '100%',
          backgroundColor: 'blue',
          position: isSticky ? 'fixed' : 'absolute',
          top: isSticky ? `${Math.max(-offset, 0)}px` : '0px',
          transition: 'top 0.2s',
        }}
      >
        {/* Содержимое синего контейнера */}
      </div>
    </div>
  );
};

export default StickyContainer;