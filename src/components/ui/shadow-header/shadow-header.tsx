import { useEffect, useState, useRef, FC } from 'react'
import { Parallax, useParallax } from 'react-scroll-parallax'
import styles from './shadow-header.module.css'
import { ShadowHeaderUIProps } from './type'
import useWindowHeight from '../../../utils/useWindowHeight'

export const ShadowHeaderUI: FC<ShadowHeaderUIProps> = ({
	text,
	start,
	marginTop = 0,
}) => {
	const windowHeight = useWindowHeight()

	const [disabled, setDisabled] = useState(true)

	useEffect(() => {
		setDisabled(false)
	}, [])

	const parallaxText = useParallax<HTMLDivElement>({
		translateX: ['0%', '15%', 'easeInCubic'],
		translateY: ['50%', '-10%', 'easeInCubic'],
		startScroll: start - windowHeight / 3,
		endScroll: start,
		disabled,
		shouldAlwaysCompleteAnimation: true,
	})

	const parallaxTulle = useParallax<HTMLDivElement>({
		translateX: ['0%', '100%', 'easeOut'],
		startScroll: start - windowHeight / 3,
		endScroll: start,
		disabled,
		shouldAlwaysCompleteAnimation: true,

	})

	return (
		<div ref={parallaxText.ref} style={{ marginTop: `${marginTop}px` }}>
			<div className={styles.text}>
				{text.map((phrase, index) => (
					<p key={index}>{phrase}</p>
				))}
				<div ref={parallaxTulle.ref} className={styles.tulle}></div>
			</div>
		</div>
	)
}
