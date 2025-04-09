import styles from './app.module.css'
import { lazy, Suspense } from 'react'
import { ScrollIndicator, ScrollbarWidth } from '../ui'
import AppHeader from '../app-header/app-header'
import Intro from '../intro/intro'
import Circles from '../circles/circles'


const Statistics = lazy(() => import('../statistics/statistics'))
const FemidaBlock = lazy(() => import('../femida/femida'))
const Cards = lazy(() => import('../cards/cards'))
const Pipe = lazy(() => import('../pipe/pipe'))
const Net = lazy(() => import('../net/net'))
const Folders = lazy(() => import('../folders/folders'))
const Final = lazy(() => import('../final/final'))
const Footer = lazy(() => import('../footer/footer'))

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
			<Suspense fallback={<div>Загрузка анимации...</div>}>
				<Statistics />
			</Suspense>
			{/* <Suspense fallback={<div>Загрузка анимации...</div>}>
				<FemidaBlock />
			</Suspense>
			<Suspense fallback={<div>Загрузка анимации...</div>}>
				<Cards />
			</Suspense>
			<Suspense fallback={<div>Загрузка анимации...</div>}>
				<Pipe />
			</Suspense>
			<Suspense fallback={<div>Загрузка анимации...</div>}>
				<Net />
			</Suspense> */}
			<Suspense fallback={<div>Загрузка анимации...</div>}>
				<Folders />
			</Suspense>
			<ScrollbarWidth />
			<Suspense fallback={<div>Загрузка анимации...</div>}>
				<Final />
			</Suspense>
			<Suspense fallback={<div>Загрузка анимации...</div>}>
				<Footer />
			</Suspense>
		</div>
	)
}
export default App
