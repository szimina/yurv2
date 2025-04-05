import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollYContainerUI } from '../scroll-y-container'
import { FolderUI } from '../folder'
import { useScrollPosition } from '../../../utils/useScrollPosition'
import styles from './test.module.css'

// Конфигурация папок с предоставленными данными
const FOLDERS_DATA = [
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

const ScrollAnimationComponent = () => {
  const { scrollY } = useScroll()
  const [state, setState] = useState({
    left: 0,
    top: 0,
    isVisible: false,
  })

  const headerRef = useRef<HTMLDivElement>(null!)
  const foldersRef = useRef<HTMLDivElement>(null)
  const start = useScrollPosition(headerRef)

  useEffect(() => {
    const handleResize = () => {
      if (foldersRef.current) {
        const viewportWidth = window.innerWidth
        const containerWidth = foldersRef.current.getBoundingClientRect().width
        const isDesktop = viewportWidth > 767
        const baseSize = isDesktop ? 300 : 200

        setState((prev) => ({
          ...prev,
          left: (containerWidth - baseSize) / 7,
          top: isDesktop
            ? baseSize - (containerWidth - baseSize) / 7
            : (baseSize - (containerWidth - baseSize) / 7) / 2,
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
      setState((prev) => ({ ...prev, isVisible: true }))
    }
  }, [state.isVisible, start])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Анимации для папок
  const folderAnimations = FOLDERS_DATA.map((folder) => {
    const startOffset = folder.startOffset
    const endOffset = startOffset + 200

    const opacity = useTransform(
      scrollY,
      [startOffset, startOffset + 200, endOffset, endOffset],
      [1, 0.5, 0.3, 0]
    )

    const y = useTransform(scrollY, [startOffset, endOffset], [0, -300])

    return {
      ...folder,
      opacity,
      y,
      scale: useTransform(scrollY, [startOffset, endOffset], [1, 0.9]),
    }
  })

  return (
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
                scale: folder.scale,
                top: `${calculatedTop}px`,
                left: `${calculatedLeft}px`,
                zIndex: folder.zIndex,
                transformOrigin: 'top center',
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
  )
}

export default ScrollAnimationComponent