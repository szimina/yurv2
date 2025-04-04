import styles from './final.module.css'
import {
	BeatingHeartUI,
	ButtonUI,
	LogoUI,
	ScrollYContainerUI,
	ShadowHeaderUI,
} from '../ui'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useScrollPosition } from '../../utils/useScrollPosition'
import { Parallax, useParallax } from 'react-scroll-parallax'
import { throttle } from 'lodash'

const SCROLL_OFFSET = 200
const TEXT_ITEM_HEIGHT = 160
const LOGO_OFFSET = 25

const Final = () => {
	const sectionRef = useRef<HTMLElement>(null!)
	const [center, setCenter] = useState(0)
	const start = useScrollPosition(sectionRef)

	const [disabled, setDisabled] = useState(true)

	useEffect(() => {
		setDisabled(false)
	}, [])

	const handleResize = useCallback(() => {
		if (sectionRef.current) {
			setCenter(sectionRef.current.getBoundingClientRect().width / 2)
		}
	}, [])

	useEffect(() => {
		const observer = new ResizeObserver(throttle(handleResize, 100))
		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}
		return () => observer.disconnect()
	}, [handleResize])

	const parallaxLogo = useParallax<HTMLDivElement>({
		opacity: [1, 0],
		startScroll: start + 850,
		endScroll: start + 950,
		disabled,
		shouldAlwaysCompleteAnimation: true,
	})

	return (
		<section ref={sectionRef} className={styles.container}>
			<div className={styles.header}>
				<ShadowHeaderUI
					text={['приходите', 'к нам на', 'консультацию', 'если']}
					start={start - SCROLL_OFFSET}
					// marginTop={netContainerStyle}
				/>
			</div>
			<div
				className={styles.logoWrapper}
				style={{ left: `${center - LOGO_OFFSET}px` }}
			>
				<ScrollYContainerUI height={50} stop={1040}>
					<div ref={parallaxLogo.ref} className={styles.logoContainer}>
						<LogoUI fill='var(--main-color)' fillOnHover='var(--hover-color)' />
					</div>
				</ScrollYContainerUI>
			</div>

			<div className={styles.content}>
				<div className={styles.left}>
					<Parallax
						opacity={[0, 1]}
						startScroll={start - SCROLL_OFFSET}
						className={styles.text}
					>
						У вас долги и нет возможности платить
					</Parallax>
					<Parallax
						opacity={[0, 1]}
						startScroll={start - SCROLL_OFFSET + TEXT_ITEM_HEIGHT * 2}
						className={styles.text}
					>
						Хотите списать долги законно
					</Parallax>
					<Parallax
						opacity={[0, 1]}
						startScroll={start - 200 + TEXT_ITEM_HEIGHT * 4}
						className={styles.text}
					>
						Нужна помощь в банкротстве под ключ
					</Parallax>
				</div>
				<div className={styles.central}>
					<div className={styles.line}></div>
				</div>
				<div className={styles.right}>
					<Parallax
						opacity={[0, 1]}
						startScroll={start - SCROLL_OFFSET + TEXT_ITEM_HEIGHT}
						className={styles.text}
					>
						Коллекторы или банки подают в суд
					</Parallax>
					<Parallax
						opacity={[0, 1]}
						startScroll={start - SCROLL_OFFSET + TEXT_ITEM_HEIGHT * 3}
						className={styles.text}
					>
						Боитесь потерять имущество
					</Parallax>
				</div>
			</div>
			<BeatingHeartUI start={start + 800} className={styles.heart} />
			<ButtonUI
				className={styles.button}
				label='хочу к вам'
				href='https://t.me/+79263544901'
				openInNewTab
			></ButtonUI>
		</section>
	)
}

export default Final
