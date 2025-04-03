import { useParallax } from 'react-scroll-parallax'
import styles from './animated-header.module.css'
import { AnimatedHeaderUIProps } from './type'
import { FC, Ref, useMemo } from 'react'
import { useIsMounted } from '../../../utils/useIsMounted'

const PARALLAX_OFFSET = 185
const LETTER_DELAY = 30
const BASE_START_OFFSET = -50

export const AnimatedHeaderUI: FC<AnimatedHeaderUIProps> = ({
  text = '',
  start = 0,
}) => {
  const isMounted = useIsMounted()
  const characters = useMemo(() => text.split(''), [text])

  const effects = characters.map((char, index) => {
    if (char === ' ') return null
    
    return useParallax({
      translateY: isMounted ? [0, PARALLAX_OFFSET] : [0, 0],
      opacity: isMounted ? [0, 1] : [1, 1],
      easing: 'easeOutQuad',
      shouldAlwaysCompleteAnimation: true,
      startScroll: start - (BASE_START_OFFSET - index * LETTER_DELAY),
      endScroll: start + (typeof window !== 'undefined' ? window.innerHeight : 0) - 100,
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
            style={!isMounted ? { opacity: 1 } : undefined}
          >
            {char}
          </div>
        )
      )}
    </h2>
  )
}