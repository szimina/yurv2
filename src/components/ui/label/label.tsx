import { FC, useState, useRef, useCallback, useLayoutEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import styles from './label.module.css'
import { LabelUIProps } from './type'

export const LabelUI: FC<LabelUIProps> = ({
	header,
	buttons,
	startScroll,
	endScroll,
	translateX = ['0', '0'],
}) => {
	const scaleRef = useRef<HTMLDivElement>(null)

	return (
		<Parallax
			translateX={translateX}
			startScroll={startScroll}
			endScroll={endScroll}
			className={styles.container}
			shouldAlwaysCompleteAnimation
			onProgressChange={(progress) => {
				let scale
				if (progress < 0.3) scale = progress / 0.3
				else if (progress <= 0.8) scale = 1
				else scale = 1 - (progress - 0.8) / 0.2
				if (scaleRef.current) {
					scaleRef.current.style.scale = scale.toString()
					scaleRef.current.style.opacity = scale.toString()
				}
			}}
		>
			<div ref={scaleRef} className={styles.container}>
				<div className={styles.circle} />
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
