import { Parallax, useParallax } from 'react-scroll-parallax'
import styles from './pipe.module.css'
import { useEffect, useRef, useState } from 'react'
import { PipeSvg } from '../ui/svg'

export const Pipe = () => {
	// Состояния
	const [start, setStart] = useState<number>(0)
	const [route, setRoute] = useState<number>(0)
	const [visibility, setVisibility] = useState({
		isOneVisible: true,
		isTwoVisible: false,
		isThreeVisible: false,
	})

	// Рефы
	const sectionPipeRef = useRef<HTMLDivElement>(null)
	const svgRef = useRef<SVGSVGElement>(null)

	// Параллакс-эффект
	const parallaxPipe = useParallax<HTMLDivElement>({
		opacity: [0, 1],
		startScroll: start,
		endScroll: start + 300,
		shouldAlwaysCompleteAnimation: true,
	})

	// Основной эффект
	useEffect(() => {
		// Функция для вычисления start
		const handleLoad = () => {
			if (sectionPipeRef.current) {
				const rect = sectionPipeRef.current.getBoundingClientRect()
				setStart(window.scrollY + rect.top - window.innerHeight)
			}
			if (svgRef.current) {
				setRoute(svgRef.current.getBoundingClientRect().height)
			}
		}

		// Функция для обработки скролла
		const handleScroll = () => {
			const scrollPosition = window.scrollY
			const newVisibility = {
				isOneVisible: scrollPosition < start + 300 + route * 0.4,
				isTwoVisible:
					scrollPosition >= start + 300 + route * 0.4 &&
					scrollPosition < start + 300 + route * 0.7,
				isThreeVisible: scrollPosition >= start + 300 + route * 0.7,
			}
			setVisibility(newVisibility)
		}

		// Инициализация
		if (document.readyState === 'complete') {
			handleLoad()
		} else {
			window.addEventListener('load', handleLoad)
		}

		// Подписка на события
		window.addEventListener('scroll', handleScroll)
		handleScroll() // Вызываем сразу для начального состояния

		// Очистка
		return () => {
			window.removeEventListener('load', handleLoad)
			window.removeEventListener('scroll', handleScroll)
		}
	}, [start, route]) // Зависимости

	return (
		<div className={styles.container}>
			<div
				className={styles.pipecontainer}
				ref={(node) => {
					if (node) {
						parallaxPipe.ref.current = node
					}
					sectionPipeRef.current = node
				}}
			>
				<PipeSvg className={styles.pipe} ref={svgRef}></PipeSvg>

				<div className={styles.flashcontainer}>
					<Parallax
						translateX={['100%', '0%', 'easeInCubic']}
						translateY={['0px', `${route * 0.4}px`]}
						startScroll={start + 300}
						endScroll={start + 300 + route * 0.4}
						className={styles.flashbox}
						shouldAlwaysCompleteAnimation={true}
					>
						<div
							className={styles.flash}
							style={{ opacity: visibility.isOneVisible ? 1 : 0 }}
						/>
					</Parallax>
					<Parallax
						translateX={['0%', '100%', 'easeOutCubic']}
						translateY={['0px', `${route * 0.3}px`]}
						startScroll={start + 300 + route * 0.4}
						endScroll={start + 300 + route * 0.7}
						className={styles.flashbox}
						style={{ top: `${route * 0.4}px` }}
						shouldAlwaysCompleteAnimation={true}
					>
						<div
							className={styles.flash}
							style={{ opacity: visibility.isTwoVisible ? 1 : 0 }}
						/>
					</Parallax>

					<Parallax
						translateX={['100%', '60%']}
						translateY={['0px', `${route * 0.2}px`]}
						startScroll={start + 300 + route * 0.7}
						endScroll={start + 300 + route}
						className={styles.flashbox}
						style={{ top: `${route * 0.7}px` }}
						shouldAlwaysCompleteAnimation={true}
					>
						<div
							className={styles.flash}
							style={{
								opacity: visibility.isThreeVisible ? 1 : 0,
								transform: `scale(${visibility.isThreeVisible ? 3 : 1})`,
								transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
							}}
						/>
					</Parallax>
				</div>
			</div>
		</div>
	)
}
