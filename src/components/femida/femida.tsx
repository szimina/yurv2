import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Parallax, useParallax } from 'react-scroll-parallax'
import styles from './femida.module.css'

import { FemidaSvg, Logo, AnimatedHeader, ShadowHeader } from '../ui'
import { useScrollPosition } from '../../utils/useScrollPosition'

export const FemidaBlock = () => {
	const [containerBottom, setcontainerBottom] = useState<number>(0)

	const ref = useRef<HTMLDivElement>(null!)
	const windowHeight = window.innerHeight
	const start = useScrollPosition(ref)

	useEffect(() => {
		const handleLoad = () => {
			if (ref.current) {
				const rect = ref.current.getBoundingClientRect();
				setcontainerBottom(window.scrollY + rect.bottom)
			}
		};
	
		if (document.readyState === 'complete') {
			handleLoad();
		} else {
			window.addEventListener('load', handleLoad);
			return () => window.removeEventListener('load', handleLoad);
		}
	}, []);

	const parallaxLogo = useParallax<HTMLDivElement>({
		translateY: ['1200px', '0px', 'easeOut'],
		startScroll: start - window.innerHeight / 3,
		endScroll: start - 100,
		easing: 'easeOut',
		opacity: [0, 1],
		speed: -1,
	})

	const parallaxDescription = useParallax<HTMLDivElement>({
		translateY: ['300px', '0px', 'easeOut'],
		startScroll: start - window.innerHeight / 3,
		endScroll: start - 100 ,
		easing: 'easeOut',
		opacity: [0, 1],
		speed: -2,
	})

	const parallaxCurtain = useParallax<HTMLDivElement>({
		translateY: ['0%', '100%', 'easeOut'],
		startScroll: start - windowHeight / 2,
		endScroll: start - 100,
		easing: 'easeOut',
		speed: -2,
	})

	return (
		<div ref={ref} className={styles.container}>
			<AnimatedHeader text={'лидеры в'} start={start - windowHeight } />
			<div className={styles.logo} ref={parallaxLogo.ref}>
				<Logo fill='var(--main-color)' fillOnHover='var(--main-color)' />
			</div>
			<div className={styles.content}>
				<p className={styles.text}>Наша цель — законно вывести</p>
				<p className={styles.text}>вас из долгового кризиса!</p>
				<div ref={parallaxCurtain.ref} className={styles.curtain}></div>
			</div>

			<div className={styles.description} ref={parallaxDescription.ref}>
				списании долгов
			</div>
			<div className={styles.svg}>
				<FemidaSvg />
			</div>
			<ShadowHeader
				start={containerBottom - windowHeight /3 }
				text={[
					'Добиваемся результатов',
					'за счет жестких принципов',
					'и мягких подходов',
				]}
				marginTop={15}
			/>
		</div>
	)
}
