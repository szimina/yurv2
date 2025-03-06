import { useParallax } from 'react-scroll-parallax'
import styles from './animated-header.module.css'
import { HeaderUIProps } from './type'
import { FC, RefObject, useEffect, useRef, useState } from 'react'

export const AnimatedHeader: FC<HeaderUIProps> = ({ text }) => {
	const [start, setStart] = useState<number>(0)
	const [height, setHeight] = useState<number>(0)
	const [moove, setMoove] = useState<string>('0px')

	const containerRef = useRef<HTMLDivElement>(null)
	const windowHeight = window.innerHeight

	useEffect(() => {
		if (containerRef.current) {
			const containerPosition =
				containerRef.current.getBoundingClientRect().top + window.scrollY
			setStart(containerPosition - windowHeight / 2)
			setHeight(containerRef.current.getBoundingClientRect().height)
		}
	}, [])

	// Создаем массив с настройками для каждого параллакса
	const parallaxEffects = text.split('').map((char, index) => {
		if (char === ' ') {
			return null // Пробелы не имеют параллакс-эффекта
		}
		return useParallax<HTMLDivElement>({
			translateY: start ? [0, 190, 'easeOutQuad'] : [0, 0], // Смещение от 0 до высоты контейнера
			startScroll: start ? start - (200 - index * 30) : 0, // Увеличиваем диапазон прокрутки
			endScroll: start ? start + windowHeight - 100 : 0, // Увеличиваем диапазон прокрутки
			opacity: start ? [0, 1] : [0, 0], // Плавное появление
			easing: 'easeOutQuad', // Плавное замедление
		})
	})

	return (
		<div ref={containerRef} className={styles.container}>
			{text.split('').map((char, index) => {
				if (char === ' ') {
					return (
						<span key={index} className={styles.space}>
							{' '}
						</span>
					) // Пробел как обычный символ
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