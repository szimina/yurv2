import { FC, useState, useEffect, useRef } from 'react'
import { Parallax } from 'react-scroll-parallax'
import styles from './slip.module.css'
import { SlipUIProps, CSSEffect } from './type'

export const SlipUI: FC<SlipUIProps> = ({
  header,
  buttons,
  startScroll,
  endScroll,
  index,
}) => {
  const [progress, setProgress] = useState(0)
  const animationRef = useRef<number | null>(null) // Для requestAnimationFrame
  const lastScrollY = useRef<number>(0) // Для хранения последней позиции скролла
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null) // Для троттлинга

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      
      // Пропускаем обработку, если скролл не изменился значительно
      if (Math.abs(currentScroll - lastScrollY.current) < 5) return
      lastScrollY.current = currentScroll

      if (currentScroll >= startScroll && currentScroll <= endScroll) {
        const newProgress =
          (currentScroll - startScroll) / (endScroll - startScroll)
        setProgress(newProgress)
      } else if (currentScroll < startScroll) {
        setProgress(0)
      } else if (currentScroll > endScroll) {
        setProgress(1)
      }
    }

    const throttledScroll = () => {
      // Очищаем предыдущий таймаут
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current)
      }
      
      // Устанавливаем новый таймаут
      throttleTimeout.current = setTimeout(() => {
        animationRef.current = requestAnimationFrame(handleScroll)
      }, 16) // ~60fps (1000ms/60 ≈ 16ms)
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current)
      }
    }
  }, [startScroll, endScroll])

  // ... остальной код компонента остается без изменений
  const opacity =
    progress < 0.3 ? progress * 100 : progress < 0.9 ? 1 : 1 - progress

  const distance = window.innerWidth - 350

  const translateX =
    progress < 0.3
      ? -progress * distance * 2
      : progress < 0.9
      ? -0.3 * distance
      : -progress * distance

  const scale =
    progress < 0.3 ? progress : progress < 0.9 ? 1.1 : 1 - progress / 4

  const getTranslateX: CSSEffect[] = [
    ['0%', '-50%', 'easeInCubic'],
    ['0%', '50%', 'easeInCubic'],
    ['0%', '50%', 'easeInCubic'],
    ['0%', '-50%', 'easeInCubic'],
  ]
  const getTranslateY: CSSEffect[] = [
    ['0%', '-250%', 'easeInCubic'],
    ['0%', '-250%', 'easeInCubic'],
    ['0%', '200%', 'easeInCubic'],
    ['0%', '200%', 'easeInCubic'],
  ]

  return (
    <div
      className={styles.container}
      style={{
        opacity: opacity,
        transform: `translateX(${translateX}px) scale(${scale})`,
        transition: 'opacity 0.3s, transform 0.3s',
      }}
    >
      <div className={styles.circle}>
        <Parallax
          translateX={getTranslateX[index]}
          translateY={getTranslateY[index]}
          startScroll={startScroll + 100}
          endScroll={endScroll}
          className={styles.flashbox}
          shouldAlwaysCompleteAnimation={true}
        >
          <div
            className={styles.flash}
            style={{ opacity: progress > 0.1 || progress > 0.8 ? 1 : 0 }}
          />
        </Parallax>
      </div>

      <h3 className={styles.header}>{header}</h3>
      <div className={styles.buttons}>
        {buttons.map((button, index) => (
          <p key={index} className={styles.label}>
            {button}
          </p>
        ))}
      </div>
    </div>
  )
}