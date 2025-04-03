import { useState, useEffect } from 'react';

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false); // Опционально: сброс при размонтировании
  }, []);

  return isMounted;
};