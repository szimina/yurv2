import React, { FC, useState, useLayoutEffect, useMemo } from 'react'

import styles from './circle.module.css'
import { CircleUIProps } from './type'
import { Parallax, ParallaxProps } from 'react-scroll-parallax'

export const CircleUI: FC<CircleUIProps> = React.memo(({
  text,
  index,
  size,
  top = 0,
  left = 0,
  translateX = ['0', '0', 'easeInOutCubic'],
  translateY = ['0', '0', 'easeInOutCubic'],
  startScroll = 0,
  endScroll = 0,
}) => {
  const style = useMemo(() => ({
    '--size': `${size}px`,
    '--top': `${top}px`,
    '--left': `${left}px`,
    '--z-index': `${index}`,
  } as React.CSSProperties), [size, top, left, index]);

  return (
    <Parallax
      className={styles.circle}
      style={style}
      translateX={translateX as ParallaxProps['translateX']}
      translateY={translateY as ParallaxProps['translateY']}
      startScroll={startScroll}
      endScroll={endScroll}
      shouldAlwaysCompleteAnimation
    >
      <p className={styles.text}>{text}</p>
    </Parallax>
  )
});