import { FC, useState, useRef, useCallback, useLayoutEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import styles from './label.module.css'
import { CSSEffect, LabelUIProps } from './type'

export const LabelUI: FC<LabelUIProps> = ({
	header,
	buttons,
	startScroll,
	endScroll,
	translateX = ['0', '0'],
  index,
}) => {
	const scaleRef = useRef<HTMLDivElement>(null)

    const getTranslateX: CSSEffect[] = [
      ['0%', '-50%', 'easeOutCubic'],
      ['0%', '50%', 'easeOutCubic'],
      ['0%', '50%', 'easeOutCubic'],
      ['0%', '50%', 'easeOutCubic'],
    ]
    const getTranslateY: CSSEffect[] = [
      ['0%', '-250%', 'easeOutCubic'],
      ['0%', '-250%', 'easeOutCubic'],
      ['0%', '200%', 'easeOutCubic'],
      ['0%', '200%', 'easeOutCubic'],
    ]

	return (
		<Parallax
			translateX={translateX}
			startScroll={startScroll}
			endScroll={endScroll}
			className={styles.container}
			shouldAlwaysCompleteAnimation
			onProgressChange={(progress) => {
				let scale
				if (progress < 0.1) scale = progress / 0.1
				else if (progress <= 0.8) scale = 1
				else scale = 1 - (progress - 0.8) / 0.2
				if (scaleRef.current) {
					scaleRef.current.style.scale = scale.toString()
					scaleRef.current.style.opacity = scale.toString()
				}
			}}
		>
			<div ref={scaleRef} className={styles.container} style={{opacity: '0'}}>
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
          />
        </Parallax> 
        </div>
				<h3 className={styles.header}>{header}</h3>
				<div className={styles.buttons}>
					{buttons.map((button, i) => (
						<p key={i} className={styles.label}>
							{button}
						</p>
					))}
				</div>
			</div>
		</Parallax>
	)
}
