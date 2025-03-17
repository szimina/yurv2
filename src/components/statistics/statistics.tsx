import { StatisticCard } from '../ui/stat-card'
import styles from './statistics.module.css'

export const Statistics = () => {
	return (
		<div className={styles.statistics}>
			<StatisticCard
				stroke={'var(--main-color)'}
				header={'99%'}
				text={'успешных процедур'}
			/>
			<StatisticCard
				stroke={'var(--main-color)'}
				header={'>10'}
				text={'опытных юристов'}
			/>
			<StatisticCard
				stroke={'var(--main-color)'}
				header={'12'}
				text={'месяцев на дело'}
			/>
		</div>
	)
}
