import styles from './cards.module.css'
import { CardUI, Pipe } from '../ui'
import { useEffect, useRef, useState } from 'react'
import { useParallax } from 'react-scroll-parallax'

export const Cards = () => {
	const [start, setStart] = useState<number>(0)

	const sectionRef = useRef<HTMLElement | null>(null)

	useEffect(() => {
		if (sectionRef.current) {
			setStart(sectionRef.current.getBoundingClientRect().top)
		}
	}, [])

	const parallax = useParallax<HTMLElement>({
		translateY: ['0px', '800px'],
		startScroll: start,
		endScroll: start + window.innerHeight,
	})

	const [rotate, setRotate] = useState(10)

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 375) {
				setRotate(3)
			} else {
				setRotate(10)
			}
		}

		handleResize()

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<section
			className={styles.container}
			ref={(node) => {
				if (node) {
					parallax.ref.current = node
				}
				sectionRef.current = node
			}}
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
	)
}
