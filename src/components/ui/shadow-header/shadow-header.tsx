import { useEffect, useState, useRef, FC } from 'react'
import { Parallax, useParallax } from 'react-scroll-parallax'
import styles from './shadow-header.module.css'
import { ShadowHeaderUIProps } from './type'

export const ShadowHeader: FC<ShadowHeaderUIProps> = ({
	text,
	start,	
}) => {

  const windowHeight = window.innerHeight

	const parallaxTulle = useParallax<HTMLDivElement>({
		translateX: ['0%', '100%', 'easeOut'],
    // translateY: ['5%', '-5%', 'easeOutCubic'],
		startScroll: start - windowHeight / 2 ,
		endScroll:start + windowHeight,
		speed: -2,
	})

	return (
		<Parallax
			translateX={['-5%', '10%', 'easeOutCubic']}
			translateY={['5%', '-5%', 'easeOutCubic']}
		>
			<div className={styles.text}>
				{text.map((phrase, index) => (
					<p key={index}>{phrase}</p>
				))}
				<div ref={parallaxTulle.ref} className={styles.tulle}></div>
			</div>
		</Parallax>
	)
}
