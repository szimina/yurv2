import { FC, useEffect, useMemo, useRef, useState, useCallback } from 'react'
import styles from './folder.module.css'
import { FolderUIProps } from './type'

export const FolderUI: FC<FolderUIProps> = ({
  title,
  startScroll,
  top,
  left,
  zIndex,
}) => {
  const [scrollY, setScrollY] = useState(0)
  const folderRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number | null>(null) // Явно указываем тип

  const isMobile = typeof window !== 'undefined' 
    ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    : false

  const style = useMemo(
    () => ({
      '--top-folder': `${top}px`,
      '--left-folder': `${left}px`,
      '--z-index-folder': `${zIndex}`,
    }) as React.CSSProperties,
    [top, left, zIndex]
  )

  const getAnimationProgress = useCallback(() => {
    if (!startScroll) return 0
    const scrollPosition = scrollY - startScroll
    const animationLength = isMobile ? 300 : 200
    return Math.min(Math.max(scrollPosition / animationLength, 0), 1)
  }, [scrollY, startScroll, isMobile])

  useEffect(() => {
    const handleScroll = () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      requestRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  const progress = getAnimationProgress()
  const translateY = `${progress * (isMobile ? -300 : -200)}px`
  const opacity = 1 - progress

  return (
    <div
      ref={folderRef}
      className={`${styles.container} ${isMobile ? styles.mobile : ''}`}
      style={{
        ...style,
        transform: `translateY(${translateY})`,
        opacity: opacity,
        transition: isMobile 
          ? 'transform 0.2s ease-out, opacity 0.4s ease-out' 
          : 'transform 0.1s ease-out, opacity 0.3s ease-out',
      }}
    >
      <svg className={styles.svg} viewBox='0 0 376 255'>
        <path
          className={styles.path}
          d='M127 13.081C127 5.857 121.143 0 113.919 0H23.916C10.707 0 0 10.707 0 23.916V219c0 19.882 16.118 36 36 36h304c19.882 0 36-16.118 36-36V54c0-14.912-12.088-27-27-27H140.919C133.232 27 127 20.768 127 13.081Z'
        />
        <path
          className={styles.path}
          d='M113.919.5c6.948 0 12.581 5.633 12.581 12.581 0 7.964 6.455 14.419 14.419 14.419H349c14.636 0 26.5 11.864 26.5 26.5v165c0 19.606-15.894 35.5-35.5 35.5H36C16.394 254.5.5 238.606.5 219V23.916C.5 10.983 10.983.5 23.916.5h90.003Z'
        />
      </svg>
      <h1 className={styles.title}>{title}</h1>
    </div>
  )
}