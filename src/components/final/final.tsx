import styles from './final.module.css'
import {
	BeatingHeart,
	Button,
	HeardSvg,
	Logo,
	ScrollYContainer,
	ShadowHeader,
} from '../ui'
import { useEffect, useRef, useState } from 'react'
import { useScrollPosition } from '../../utils/useScrollPosition'
import { Parallax, useParallax } from 'react-scroll-parallax'
import { throttle } from 'lodash'

export const Final = () => {
	const sectionRef = useRef<HTMLElement>(null!)
	const [center, setCenter] = useState(0)

	const start = useScrollPosition(sectionRef)

	useEffect(() => {
		const calculatePosition = () => {
			if (sectionRef.current) {
				const rect = sectionRef.current.getBoundingClientRect()
				return rect.width / 2
			}
			return 0
		}

		const handleLoadAndResize = throttle(() => {
			setCenter(calculatePosition())
		}, 100)

		if (document.readyState === 'complete') {
			handleLoadAndResize()
		} else {
			window.addEventListener('load', handleLoadAndResize)
		}

		window.addEventListener('resize', handleLoadAndResize)

		return () => {
			window.removeEventListener('load', handleLoadAndResize)
			window.removeEventListener('resize', handleLoadAndResize)
		}
	}, [sectionRef])

	return (
		<section ref={sectionRef} className={styles.container}>
			<div className={styles.header}>
				<ShadowHeader
					text={['приходите', 'к нам на', 'консультацию', 'если']}
					start={start - 200}
					// marginTop={netContainerStyle}
				/>
			</div>
			<div
				style={{ position: 'absolute', left: `${center - 25}px`, zIndex: '2' }}
			>
				<ScrollYContainer height={50} stop={1040}>
					<Parallax
						className={styles.logoContainer}
						opacity={[1, 0]}
						startScroll={start + 850}
						endScroll={start + 950}
					>
						<Logo fill='var(--main-color)' fillOnHover='var(--hover-color)' />
					</Parallax>
				</ScrollYContainer>
			</div>

			<div className={styles.content}>
				<div className={styles.left}>
					<Parallax
						opacity={[0, 1]}
						startScroll={start - 200}
						className={styles.text}
					>
						У вас долги и нет возможности платить
					</Parallax>
					<Parallax
						opacity={[0, 1]}
						startScroll={start - 200 + 160 * 2}
						className={styles.text}
					>
						Хотите списать долги законно
					</Parallax>
					<Parallax
						opacity={[0, 1]}
						startScroll={start - 200 + 160 * 4}
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
						startScroll={start - 200 + 160}
						className={styles.text}
					>
						Коллекторы или банки подают в суд
					</Parallax>
					<Parallax
						opacity={[0, 1]}
						startScroll={start - 200 + 160 * 3}
						className={styles.text}
					>
						Боитесь потерять имущество
					</Parallax>
				</div>
			</div>
			<BeatingHeart start={start + 800} className={styles.heart} />
			<Button
				className={styles.button}
				href='https://t.me/+79111005005'
				openInNewTab
			>
				хочу к вам
			</Button>
		</section>
	)
}
