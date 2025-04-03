import { useParallax } from 'react-scroll-parallax'
import styles from './animated-header.module.css'
import { AnimatedHeaderUIProps } from './type'
import { FC, Ref, useMemo, useState, useEffect } from 'react'

const PARALLAX_OFFSET = 185
const LETTER_DELAY = 30
const BASE_START_OFFSET = -50

export const AnimatedHeaderUI: FC<AnimatedHeaderUIProps> = ({
  text = '',
  start = 0,
}) => {
  const characters = useMemo(() => text.split(''), [text])
  const [isVisible, setIsVisible] = useState(false) // Состояние видимости

  const effects = characters.map((char, index) => {
    if (char === ' ') return null
    
    return useParallax({
      translateY: [0, PARALLAX_OFFSET],
      opacity: [0, 1],
      easing: 'easeOutQuad',
      shouldAlwaysCompleteAnimation: true,
      startScroll: start - (BASE_START_OFFSET - index * LETTER_DELAY),
      endScroll: start + (typeof window !== 'undefined' ? window.innerHeight : 0) - 100,
      onProgressChange: (progress) => {
        // Если анимация началась (progress > 0), делаем видимым
        if (progress > 0 && !isVisible) {
          setIsVisible(true)
        }
      },
    })
  })

  return (
    <h2 aria-label={text} className={styles.container}>
      {characters.map((char, index) =>
        char === ' ' ? (
          <span key={index} className={styles.space}>&nbsp;</span>
        ) : (
          <div
            key={index}
            ref={effects[index]?.ref as Ref<HTMLDivElement> | undefined}
            className={styles.letter}
            aria-hidden="true"
            role="presentation"
            style={{
              visibility: isVisible ? 'visible' : 'hidden',
            }}
          >
            {char}
          </div>
        )
      )}
    </h2>
  )
}