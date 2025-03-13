import { useEffect, useState, useRef } from 'react'
import { Parallax, useParallax } from 'react-scroll-parallax'
import styles from './femida.module.css'
import Femida from '../ui/femida/femida'
import { Logo } from '../ui'
import { AnimatedHeader } from '../ui/animated-header/animated-header'
import { ShadowHeader } from '../ui/shadow-header'

export const FemidaBlock = () => {
	const [start, setStart] = useState<number>(0)
  const [containerBottom, setcontainerBottom] = useState<number>(0)


	const ref = useRef<HTMLDivElement>(null)
	const windowHeight = window.innerHeight

	useEffect(() => {
		if (ref.current) {
			setStart(ref.current.getBoundingClientRect().top)
			setcontainerBottom(ref.current.getBoundingClientRect().bottom)
		}
	}, [])

	const parallaxLogo = useParallax<HTMLDivElement>({
		translateY: start ? ['1200px', '0px', 'easeOut'] : [0, 0],
		startScroll: start ? start - windowHeight / 2: 0,
		endScroll: start ? start : 0,
		easing: 'easeOut',
		opacity: start ? [0, 1] : [0, 0],
		speed: -1,
	})

	const parallaxDescription = useParallax<HTMLDivElement>({
		translateY: start ? ['300px', '0px', 'easeOut'] : [0, 0],
		startScroll: start ? start - windowHeight / 2 : 0,
		endScroll: start ? start + windowHeight /4: 0,
		easing: 'easeOut',
		speed: -2,
	})

	const parallaxCurtain = useParallax<HTMLDivElement>({
		translateY: start ? ['0%', '100%', 'easeOut'] : [0, 0],
		startScroll: start ? start - windowHeight / 2 : 0,
		endScroll: start ? start + windowHeight /3 : 0,
		easing: 'easeOut',
		speed: -2,
	})

	return (
		<div ref={ref} className={styles.container}>
			<AnimatedHeader text={'лидеры в'} />
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
				<Femida />
			</div>
			<ShadowHeader start={containerBottom} text={['Добиваемся результатов', 'за счет жестких принципов', 'и мягких подходов' ]}/>
		</div>
	)
}
