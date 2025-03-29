import styles from './net.module.css'
import { useRef } from 'react'
import { ShadowHeader } from '../ui/shadow-header'
import { Slip } from '../ui/slip'
import { ScrollYContainer } from '../ui/scroll-y-container'
import { useScrollPosition } from '../../utils/useScrollPosition'
import { NetSvg } from '../ui/svg'

export const Net = () => {
	const divRef = useRef<HTMLDivElement>(null!)
	const start = useScrollPosition(divRef)

	const netContainerStyle = window.innerWidth <= 768 ? 300 : 500

	return (
		<ScrollYContainer height={5000} stop={4500}>
			<div className={styles.netcontainer}>
				<div>
					<ShadowHeader
						text={[
							'снижаем потери',
							'за счет грамотного',
							'планирования процедуры',
							'банкротства',
						]}
						start={start}
						marginTop={netContainerStyle}
					/>
				</div>
				<div className={styles.net}>
					<NetSvg />
				</div>
			</div>
			<div className={styles.slips} ref={divRef}>
				<Slip
					startScroll={start}
					endScroll={start + 900}
					header={'Консультируем и сопровождаем'}
					buttons={['Юридически', 'Финансово', 'Психологически']}
					index={0}
				/>
				<Slip
					startScroll={start + 900}
					endScroll={start + 1800}
					header={'Защищаем от кредиторов'}
					buttons={['Коллекторы', 'Банки', 'МФО', 'Суды']}
					index={1}
				/>
				<Slip
					startScroll={start + 1800}
					endScroll={start + 2700}
					header={'Оформляем документы'}
					buttons={['Заявления', 'Отчеты', 'Ходатайства', 'Исковые']}
					index={2}
				/>
				<Slip
					startScroll={start + 2700}
					endScroll={start + 3600}
					header={'Ведем судебные процессы'}
					buttons={['Арбитраж', 'Апелляции', 'Исполнительное', 'Обжалование']}
					index={3}
				/>
			</div>
		</ScrollYContainer>
	)
}
