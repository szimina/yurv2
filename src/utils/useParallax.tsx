import { useEffect, useRef, useState } from "react";

export const useParallax = (speed = 1, reverse = false) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const { top, height } = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          const scrollPercent = (top + height) / (viewportHeight + height);

          // Параллакс-эффект (можно настроить формулу)
          const offset = scrollPercent * 100 * speed * (reverse ? -1 : 1);
          setTransform(offset);
        }
      },
      { threshold: Array.from({ length: 100 }, (_, i) => i * 0.01) }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [speed, reverse]);

  return {
    ref,
    style: {
      transform: `translateY(${transform}px)`,
      transition: "transform 0.1s ease-out",
      willChange: "transform",
    },
  };
};