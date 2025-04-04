import { useState, useEffect } from 'react';

const useWindowHeight = (initialHeight?: number) => {
  const [height, setHeight] = useState<number>(initialHeight || window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return height;
};

export default useWindowHeight;