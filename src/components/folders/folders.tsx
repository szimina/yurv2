import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import styles from './folders.module.css'
import { useScrollPosition } from '../../utils/useScrollPosition'
import { FolderUI, ScrollYContainerUI } from '../ui'

// Конфигурация папок с предоставленными данными
export const FOLDERS_DATA = [
  {
    title: 'Консультация',
    startOffset: 500,
    topCalc: (top: number) => top,
    leftCalc: (_left: number) => 0,
    zIndex: 8,
  },
  {
    title: 'Анализ долгов',
    startOffset: 700,
    topCalc: (_top: number) => 0,
    leftCalc: (left: number) => left + 5,
    zIndex: 7,
  },
  {
    title: 'Сбор документов',
    startOffset: 900,
    topCalc: (top: number) => top * 1.5,
    leftCalc: (left: number) => left * 2,
    zIndex: 6,
  },
  {
    title: 'Подача заявления',
    startOffset: 1100,
    topCalc: (top: number) => top * 0.3,
    leftCalc: (left: number) => left * 3 - 7,
    zIndex: 5,
  },
  {
    title: 'Судебное сопровождение',
    startOffset: 1300,
    topCalc: (top: number) => top * 0.1,
    leftCalc: (left: number) => left * 4,
    zIndex: 4,
  },
  {
    title: 'Взаимодействие с кредиторами',
    startOffset: 1500,
    topCalc: (top: number) => top * 1.8,
    leftCalc: (left: number) => left * 5 - 5,
    zIndex: 3,
  },
  {
    title: 'Реализация имущества',
    startOffset: 1700,
    topCalc: (top: number) => top * 0.1,
    leftCalc: (left: number) => left * 6 + 7,
    zIndex: 2,
  },
  {
    title: 'Завершение процедуры',
    startOffset: 1900,
    topCalc: (top: number) => top * 1.2,
    leftCalc: (left: number) => left * 7,
    zIndex: 1,
  },
]

const Folders = () => {
  const [state, setState] = useState({
    left: 0,
    top: 0,
    isVisible: false,
    windowSize: { width: 0, height: 0 }
  })

  const headerRef = useRef<HTMLDivElement>(null!)
  const foldersRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const start = useScrollPosition(headerRef)
  const animationProgress = useMotionValue(0)

  const { scrollY } = useScroll()

  // Фиксируем прогресс анимации
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      const progress = Math.min(Math.max((latest - start) / 1000, 0), 1)
      animationProgress.set(progress)
    })
    return () => unsubscribe()
  }, [start, scrollY, animationProgress])

  useEffect(() => {
    const handleResize = () => {
      if (foldersRef.current) {
        const viewportWidth = window.innerWidth
        const containerWidth = foldersRef.current.getBoundingClientRect().width
        const isDesktop = viewportWidth > 767
        const baseSize = isDesktop ? 300 : 200

        setState(prev => ({
          ...prev,
          left: (containerWidth - baseSize) / 7,
          top: isDesktop
            ? baseSize - (containerWidth - baseSize) / 7
            : (baseSize - (containerWidth - baseSize) / 7) / 2,
          windowSize: {
            width: window.innerWidth,
            height: window.innerHeight
          }
        }))
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleScroll = useCallback(() => {
    if (start === 0) return
    const currentScrollPosition = window.scrollY
    if (currentScrollPosition > start - 100 && !state.isVisible) {
      setState(prev => ({ ...prev, isVisible: true }))
    }
  }, [state.isVisible, start])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Анимации с фиксированным прогрессом
  const folderAnimations = FOLDERS_DATA.map((folder, index) => {
    const delay = index * 0.1 // Задержка в долях прогресса (0-1)
    const duration = 0.3 // Длительность анимации для каждой папки

    return {
      ...folder,
      opacity: useTransform(
        animationProgress,
        [delay, delay + duration],
        [1, 0]
      ),
      y: useTransform(
        animationProgress,
        [delay, delay + duration],
        [0, -200 - (index * 20)]
      ),
      scale: useTransform(
        animationProgress,
        [delay, delay + duration],
        [1, 0.85 - (index * 0.02)]
      )
    }
  })

  return (
    <div ref={containerRef}>
      <ScrollYContainerUI height={2500} stop={1900}>
        <div
          className={styles.header}
          ref={headerRef}
          style={{ marginTop: '100px' }}
        >
          8 этапов работы нашей компании{' '}
          <span
            className={`${styles.highlight} ${state.isVisible ? styles.moove : ''}`}
            data-text='с клиентами'
          >
            с клиентами
          </span>
        </div>

        <div className={styles.folders} ref={foldersRef}>
          {folderAnimations.map((folder, index) => {
            const calculatedTop = folder.topCalc(state.top)
            const calculatedLeft = folder.leftCalc(state.left)

            return (
              <motion.div
                key={folder.title}
                style={{
                  position: 'absolute',
                  opacity: folder.opacity,
                  y: folder.y,
                  scale: folder.scale,
                  top: `${calculatedTop}px`,
                  left: `${calculatedLeft}px`,
                  zIndex: folder.zIndex,
                  transformOrigin: 'top center',
                  willChange: 'transform, opacity'
                }}
              >
                <FolderUI
                  title={folder.title}
                  top={0}
                  left={0}
                  zIndex={folder.zIndex}
                />
              </motion.div>
            )
          })}
        </div>
      </ScrollYContainerUI>
    </div>
  )
}

export default Folders;