import { useState, useEffect } from 'react';

const useWindowWidth = (initialWidth?: number) => {
  const [width, setWidth] = useState<number>(initialWidth || window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
};

export default useWindowWidth;