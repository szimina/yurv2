import { useParallax } from 'react-scroll-parallax'
import styles from './animated-header.module.css'
import { HeaderUIProps } from './type'
import { FC } from 'react'

export const AnimatedHeader: FC<HeaderUIProps> = ({ text, start }) => {

	const parallaxEffects = text.split('').map((char, index) => {
		if (char === ' ') {
			return null 
		}
		return useParallax<HTMLDivElement>({
			translateY:  [0, 190, 'easeOutQuad'],
			startScroll: start - (200 - index * 30), 
			endScroll: start + window.innerHeight - 100,
			opacity: [0, 1, 'easeOutQuad'],
			shouldAlwaysCompleteAnimation: true,
		})
	})

	return (
		<div  className={styles.container}>
			{text.split('').map((char, index) => {
				if (char === ' ') {
					return (
						<span key={index} className={styles.space}>
							{' '}
						</span>
					) 
				}
				return (
					<div
						key={index}
						ref={parallaxEffects[index]?.ref}
						className={styles.letter}
					>
						{char}
					</div>
				)
			})}
		</div>
	)
}