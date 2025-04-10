import React, { FC, useMemo } from 'react'
import styles from './folder.module.css'
import { FolderUIProps } from './type'
import { Parallax, ParallaxProps } from 'react-scroll-parallax'

export const FolderUI: FC<FolderUIProps> = React.memo(({
  text,
  size,
  top = 0,
  left = 0,
  translateY = ['0', '0', 'easeInOutCubic'],
  startScroll = 0,
  endScroll = 0,
  zIndex = 0,
}) => {
  const style = useMemo(() => ({
    '--size-folder': `${size}px`,
    '--top-folder': `${top}px`,
    '--left-folder': `${left}px`,
    '--z-index-folder': `${zIndex}`,
  } as React.CSSProperties), [size, top, left]);

  return (
    <Parallax
      className={styles.folder}
      style={style}
      translateY={translateY as ParallaxProps['translateY']}
      opacity={[1, 0]}
      startScroll={startScroll}
      endScroll={endScroll}
      shouldAlwaysCompleteAnimation
    >
       <svg className={styles.svg} viewBox="0 0 376 255">
        <path
          className={styles.path}
          d="M127 13.081C127 5.857 121.143 0 113.919 0H23.916C10.707 0 0 10.707 0 23.916V219c0 19.882 16.118 36 36 36h304c19.882 0 36-16.118 36-36V54c0-14.912-12.088-27-27-27H140.919C133.232 27 127 20.768 127 13.081Z"
        />
        <path
          className={styles.path}
          d="M113.919.5c6.948 0 12.581 5.633 12.581 12.581 0 7.964 6.455 14.419 14.419 14.419H349c14.636 0 26.5 11.864 26.5 26.5v165c0 19.606-15.894 35.5-35.5 35.5H36C16.394 254.5.5 238.606.5 219V23.916C.5 10.983 10.983.5 23.916.5h90.003Z"
        />
      </svg>
      <h1 className={styles.title}>{text}</h1>
    </Parallax>
  )
});