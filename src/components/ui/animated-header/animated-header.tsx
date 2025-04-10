import { useParallax } from 'react-scroll-parallax'
import styles from './animated-header.module.css'
import { AnimatedHeaderUIProps } from './type'
import { FC, Ref, useMemo, useState, useEffect } from 'react'

const LETTER_DELAY = 30
const BASE_START_OFFSET = -50

export const AnimatedHeaderUI: FC<AnimatedHeaderUIProps> = ({
	text = '',
	start = 0,
}) => {
	const characters = useMemo(() => text.split(''), [text])

	const [disabled, setDisabled] = useState(true)

	useEffect(() => {
		setDisabled(false)
	}, [])

	const effects = characters.map((char, index) => {
		if (char === ' ') return null

		return useParallax({
			translateY: [-300, -14],
			opacity: [0, 1],
			easing: 'easeOutQuad',
			shouldAlwaysCompleteAnimation: true,
			startScroll: start - (BASE_START_OFFSET - index * LETTER_DELAY),
			endScroll:
				start + (typeof window !== 'undefined' ? window.innerHeight : 0) - 100,
			disabled,
		})
	})

	return (
		<h2
			aria-label={text}
			className={styles.container}
			style={{
				opacity: disabled ? 0 : 1,
				visibility: disabled ? 'hidden' : 'visible',
			}}
		>
			{characters.map((char, index) =>
				char === ' ' ? (
					<span key={index} className={styles.space}>
						&nbsp;
					</span>
				) : (
					<div
						key={index}
						ref={effects[index]?.ref as Ref<HTMLDivElement> | undefined}
						className={styles.letter}
						style={{opacity: '0'}}
						aria-hidden='true'
						role='presentation'
					>
						{char}
					</div>
				)
			)}
		</h2>
	)
}
