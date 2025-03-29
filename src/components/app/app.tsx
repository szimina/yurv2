import styles from './app.module.css'
import { Button, ScrollIndicator, ScrollbarWidth, HeardSvg } from '../ui'
import {
	AppHeader,
	Intro,
	Circles,
	Statistics,
	FemidaBlock,
	Cards,
	Net,
	Folders,
	Footer,
	Final,
	Pipe,
} from '../index'

const App = () => {
	return (
		<div className={styles.app}>
			{/* <ScrollIndicator /> */}
			<AppHeader />
			<Intro
				title={'Спишем долги быстро и законно'}
				text={'На основании ФЗ "О банкротстве"'}
			/>
			<Circles />
			<Statistics />
			<FemidaBlock />
			<Cards />
			<Pipe />
			<Net />
			<Folders />
			<ScrollbarWidth />
			<Final />
			<Footer />
		</div>
	)
}
export default App
