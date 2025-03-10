import React, { useState, useEffect } from 'react';

export const ScrollIndicator = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Добавляем обработчик события скролла
    window.addEventListener('scroll', handleScroll);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '10px',
      // backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      borderRadius: '5px',
      zIndex: 1000,
    }}>
      Scroll Y: {scrollY}px
    </div>
  );
};

