import { useState, useEffect, RefObject } from 'react';

const throttle = (fn: Function, delay: number) => {
  let lastCall = 0;
  return (...args: any[]) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return fn(...args);
  };
};

export const useScrollPosition = (ref: React.RefObject<Element> ) => {
  const [start, setStart] = useState<number>(0);

  useEffect(() => {
    const calculatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        return window.scrollY + rect.top;
      }
      return 0;
    };

    const handleLoadAndResize = throttle(() => {
      setStart(calculatePosition());
    }, 100); // 100ms задержка

    // Инициализация
    if (document.readyState === 'complete') {
      handleLoadAndResize();
    } else {
      window.addEventListener('load', handleLoadAndResize);
    }

    window.addEventListener('resize', handleLoadAndResize);

    return () => {
      window.removeEventListener('load', handleLoadAndResize);
      window.removeEventListener('resize', handleLoadAndResize);
    };
  }, [ref]);
 
  return start;
};