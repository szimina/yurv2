import { StatisticCardUI } from '../ui/stat-card'
import styles from './statistics.module.css'

export const Statistics = () => {
	return (
		<div className={styles.container}>
			<StatisticCardUI
				stroke={'var(--main-color)'}
				header={'99%'}
				text={'успешных процедур'}
			/>
			<StatisticCardUI
				stroke={'var(--main-color)'}
				header={'>10'}
				text={'опытных юристов'}
			/>
			<StatisticCardUI
				stroke={'var(--main-color)'}
				header={'12'}
				text={'месяцев на дело'}
			/>
		</div>
	)
}