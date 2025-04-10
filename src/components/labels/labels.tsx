import {
	useRef,
	useState,
	memo,
	useCallback,
	useEffect,
	useLayoutEffect,
} from 'react'
import styles from './labels.module.css'
import { LabelUI, NetSvg, ScrollYContainerUI, ShadowHeaderUI } from '../ui'
import { useScrollPosition } from '../../utils/useScrollPosition'


const LABELS_DATA = [
	{
		header: 'Консультируем и сопровождаем',
		buttons: ['Юридически', 'Финансово', 'Психологически'],
	},
	{
		header: 'Защищаем от кредиторов',
		buttons: ['Коллекторы', 'Банки', 'МФО', 'Суды'],
	},
	{
		header: 'Оформляем документы',
		buttons: ['Заявления', 'Отчеты', 'Ходатайства', 'Исковые'],
	},
	{
		header: 'Ведем судебные процессы',
		buttons: ['Арбитраж', 'Апелляции', 'Исполнительное', 'Обжалование'],
	},
]

const SCROLL_STEP = 800

const Labels = memo(() => {
	const containerRef = useRef<HTMLDivElement>(null!)

	const start = useScrollPosition(containerRef) + 400

	const [distance, setDistance] = useState(0)

	const handleResize = useCallback(() => {
		const windowWidth = window.visualViewport?.width || window.innerWidth
		const moove = windowWidth - 300
		setDistance(moove)
	}, [])

	useLayoutEffect(() => {
		handleResize()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [handleResize])

	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		if (distance) {
			setIsReady(true)
		}
	}, [distance])

	return (
		<ScrollYContainerUI height={4500} stop={4000} ref={containerRef}>
			<div className={styles.container}>
				<div className={styles.net}>
					<NetSvg />
				</div>
				<ShadowHeaderUI
					text={[
						'снижаем потери',
						'за счет грамотного',
						'планирования процедуры',
						'банкротства',
					]}
					start={start}
					marginTop={200}
				/>
				<div className={styles.labels}>
					{isReady &&
						LABELS_DATA.map((data, index) => (
							<LabelUI
								key={data.header}
								startScroll={start + index * SCROLL_STEP}
								endScroll={start + (index + 1) * SCROLL_STEP}
								header={data.header}
								buttons={data.buttons}
								translateX={['0px', `-${distance}px`]}
								index={index}
							/>
						))}
				</div>
			</div>
		</ScrollYContainerUI>
	)
})

export default Labels
