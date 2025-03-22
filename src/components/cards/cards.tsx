import styles from './cards.module.css'
import { CardUI, Pipe, ScrollYContainer } from '../ui'
import { useEffect, useRef, useState } from 'react'
import { useParallax } from 'react-scroll-parallax'

export const Cards = () => {
	const [start, setStart] = useState<number>(0)
	const [rotate, setRotate] = useState<number>(10)
	const sectionRef = useRef<HTMLElement | null>(null)

	useEffect(() => {
		if (sectionRef.current) {
			setStart(sectionRef.current.getBoundingClientRect().top)
		}
	}, [])

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 380) {
				setRotate(2)
			} else {
				setRotate(10)
			}
		}
		handleResize()
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])


	return (
		<ScrollYContainer height={1000} stop={600}>
			<section
				className={styles.container}
				ref={sectionRef}
				
			>
				<div className={styles.cards}>
					<CardUI
						header={'Индивидуальный подход и консультирование'}
						text={[
							'Мы предлагаем персональное сопровождение каждому клиенту, анализируя его финансовую ситуацию и разрабатывая оптимальную стратегию банкротства',
							'Юристы и финансовые эксперты помогают Вам на всех этапах, минимизируя риски и стресс',
						]}
						background={'var(--dark-background-color)'}
						color={'var(--main-color)'}
						startScroll={start}
						rotate={['0deg', '0deg']}
					/>
					<CardUI
						header={'Надежность и экспертность'}
						text={[
							'Компания опирается на многолетний опыт своих юристов, которые специализируются на банкротстве физических лиц и имеют высокую успешность в решении сложных случаев',
							'Наши клиенты могут быть уверены в профессионализме команды, которая учитывает все нюансы законодательства и предлагает проверенные решения',
						]}
						color={'var(--main-background-color)'}
						startScroll={start + 350}
						rotate={[`${rotate}deg`, `-${rotate}deg`]}
					/>

					<CardUI
						header={'Комплексное обслуживание "под ключ"'}
						text={[
							'Мы берем на себя все этапы процедуры банкротства: от подготовки документов до взаимодействия с судом и кредиторами',
							'Это позволяет Вам сосредоточиться на своих делах, не погружаясь в юридические тонкости',
						]}
						background={'var(--main-color)'}
						color={'var(--main-background-color)'}
						startScroll={start + 600}
						rotate={[`-${rotate}deg`, `${rotate}deg`]}
					/>
				</div>
			</section>
		</ScrollYContainer>
	)
}
