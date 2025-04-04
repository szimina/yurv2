import styles from './cards.module.css'
import { CardUI, ScrollYContainerUI } from '../ui'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useScrollPosition } from '../../utils/useScrollPosition'
import { CardUIProps } from '../ui/card/type'

// Константы для улучшения читаемости
const ROTATION_DESKTOP = 10
const ROTATION_MOBILE = 2
const MOBILE_BREAKPOINT = 380
const SECTION_HEIGHT = 1050
const SCROLL_STOP = 600

const Cards = () => {
	const [rotate, setRotate] = useState<number>(ROTATION_DESKTOP)
	const [isMounted, setIsMounted] = useState(false)
	const [disabled, setDisabled] = useState(true);

	const sectionRef = useRef<HTMLElement>(null)
	const startScrollPosition = useScrollPosition(
		sectionRef as RefObject<HTMLElement>
	)

	// Оптимизированная обработка изменения размера окна
	useEffect(() => {
		setDisabled(false);
		const handleResize = () => {
			setRotate(
				window.innerWidth <= MOBILE_BREAKPOINT
					? ROTATION_MOBILE
					: ROTATION_DESKTOP
			)
		}

		// Используем requestAnimationFrame для оптимизации производительности
		let requestId: number
		const debouncedResize = () => {
			if (requestId) cancelAnimationFrame(requestId)
			requestId = requestAnimationFrame(handleResize)
		}

		// Инициализируем значение сразу
		handleResize()
		setIsMounted(true)
		window.addEventListener('resize', debouncedResize)

		return () => {
			window.removeEventListener('resize', debouncedResize)
			if (requestId) cancelAnimationFrame(requestId)
		}
	}, [])


	// Данные для карточек вынесены в отдельный массив для улучшения читаемости
	const cardsData: CardUIProps[] = [
		{
			header: 'Индивидуальный подход и консультирование',
			text: [
				'Мы предлагаем персональное сопровождение каждому клиенту, анализируя его финансовую ситуацию и разрабатывая оптимальную стратегию банкротства',
				'Юристы и финансовые эксперты помогают Вам на всех этапах, минимизируя риски и стресс',
			],
			background: 'var(--dark-background-color)',
			color: 'var(--main-color)',
			rotate: ['0deg', '0deg'],
			startScroll: startScrollPosition + 0,
			disabled: disabled,
		},
		{
			header: 'Надежность и экспертность',
			text: [
				'Компания опирается на многолетний опыт своих юристов, которые специализируются на банкротстве физических лиц и имеют высокую успешность в решении сложных случаев',
				'Наши клиенты могут быть уверены в профессионализме команды, которая учитывает все нюансы законодательства и предлагает проверенные решения',
			],
			color: 'var(--main-background-color)',
			rotate: [`${rotate}deg`, `-${rotate}deg`],
			startScroll: startScrollPosition + 250,
			disabled: disabled,
		},
		{
			header: 'Комплексное обслуживание "под ключ"',
			text: [
				'Мы берем на себя все этапы процедуры банкротства: от подготовки документов до взаимодействия с судом и кредиторами',
				'Это позволяет Вам сосредоточиться на своих делах, не погружаясь в юридические тонкости',
			],
			background: 'var(--main-color)',
			color: 'var(--main-background-color)',
			rotate: [`-${rotate}deg`, `${rotate}deg`],
			startScroll: startScrollPosition + 500,
			disabled: disabled,
		},
	]

	return (
		<ScrollYContainerUI height={SECTION_HEIGHT} stop={SCROLL_STOP}>
			<section className={styles.container} ref={sectionRef}>
				<div className={styles.cards}>
					{isMounted &&
						cardsData.map((card, index) => (
							<CardUI
								key={index}
								header={card.header}
								text={card.text}
								background={card.background}
								color={card.color}
								startScroll={card.startScroll}
								rotate={card.rotate}
								disabled={card.disabled}
							/>
						))}
				</div>
			</section>
		</ScrollYContainerUI>
	)
}

export default Cards;