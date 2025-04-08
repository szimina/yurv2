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

  // Используем useSpring для плавности анимаций
  const { scrollY } = useScroll({
    layoutEffect: false
  })

  // Фиксируем размеры и позиции при изменении окна
  useEffect(() => {
    const updateDimensions = () => {
      if (!foldersRef.current) return
      
      const viewportWidth = window.innerWidth
      const isDesktop = viewportWidth > 767
      const baseSize = isDesktop ? 300 : 200
      const containerWidth = foldersRef.current.getBoundingClientRect().width

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

    updateDimensions()
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (foldersRef.current) {
      resizeObserver.observe(foldersRef.current)
    }

    window.addEventListener('resize', updateDimensions)
    return () => {
      window.removeEventListener('resize', updateDimensions)
      resizeObserver.disconnect()
    }
  }, [])

  // Обработчик появления заголовка
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

  // Оптимизированные анимации с буферизацией значений
  const folderAnimations = FOLDERS_DATA.map((folder) => {
    const animationStart = start + folder.startOffset
    const animationEnd = animationStart + 300 // Увеличили длительность анимации

    // Используем useSpring для плавности
    const opacity = useSpring(
      useTransform(
        scrollY,
        [animationStart - 100, animationStart, animationEnd - 50, animationEnd],
        [1, 1, 0, 0]
      ),
      { damping: 20, stiffness: 150 }
    )

    const y = useSpring(
      useTransform(
        scrollY,
        [animationStart, animationEnd],
        [0, -150]
      ),
      { damping: 20, stiffness: 150 }
    )

    return {
      ...folder,
      opacity,
      y
    }
  })

  return (
    <div ref={containerRef}>
      <ScrollYContainerUI height={2500} stop={2250}>
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
          {folderAnimations.map((folder) => {
            const calculatedTop = folder.topCalc(state.top)
            const calculatedLeft = folder.leftCalc(state.left)

            return (
              <motion.div
                key={folder.title}
                style={{
                  position: 'absolute',
                  opacity: folder.opacity,
                  y: folder.y,
                  top: `${calculatedTop}px`,
                  left: `${calculatedLeft}px`,
                  zIndex: folder.zIndex,
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden' // Улучшаем производительность
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