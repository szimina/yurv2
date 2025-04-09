import {
	memo,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react'

import styles from './folders.module.css'
import { useScrollPosition } from '../../utils/useScrollPosition'
import { FolderUI, ScrollYContainerUI } from '../ui'

const FOLDERS_TEXT = [
	'Консультация',
	'Анализ долгов',
	'Сбор документов',
	'Подача заявления',
	'Судебное сопровождение',
	'Взаимодействие с кредиторами',
	'Реализация имущества',
	'Завершение процедуры',
]

const Folders = memo(() => {
	const [state, setState] = useState({
		isVisible: false,
		left: 0,
		top: 0,
	})
	const [foldersState, setFoldersState] = useState({
		left: new Array(8).fill(0),
		top: new Array(8).fill(0),
		startScroll: new Array(8).fill(0),
		zIndex: [8, 7, 6, 5, 4, 3, 2, 1],
	})

	const headerRef = useRef<HTMLDivElement>(null!)
	const foldersRef = useRef<HTMLDivElement>(null)
	const start = useScrollPosition(headerRef)

	const handleScroll = useCallback(() => {
		if (start === 0) return
		const currentScrollPosition = window.scrollY
		if (currentScrollPosition > start - 100 && !state.isVisible) {
			setState((prev) => ({ ...prev, isVisible: true }))
		}
	}, [state.isVisible, start])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: false })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [handleScroll])

	const { left, top, startScroll } = useMemo(() => {
		return {
			top: [
				state.top,
				1,
				state.top * 1.5,
				state.top * 0.3,
				state.top * 0.1,
				state.top * 1.8,
				state.top * 0.1,
				state.top * 1.2,
			],
			left: [
				1,
				state.left + 5,
				state.left * 2,
				state.left * 3 - 7,
				state.left * 4,
				state.left * 5 - 5,
				state.left * 6 + 7,
				state.left * 7,
			],
			startScroll: [
				start + 200,
				start + 400,
				start + 600,
				start + 800,
				start + 1000,
				start + 1200,
				start + 1400,
				start + 1600,
			],
		}
	}, [state.top, state.left, start])

	useEffect(() => {
		setFoldersState((prev) => ({
			...prev,
			left,
			top,
			startScroll,
		}))
	}, [state.left, state.top, start])

	useEffect(() => {
		const handleResize = () => {
			if (!foldersRef.current) return;
			
			if (foldersRef.current) {
				const viewportWidth = window.innerWidth
				const containerWidth = foldersRef.current.getBoundingClientRect().width
				const isDesktop = viewportWidth > 767
				const baseSize = isDesktop ? 300 : 200

				setState((prev) => ({
					...prev,
					left: (containerWidth - baseSize) / 7,
					top: isDesktop
						? baseSize - (containerWidth - baseSize) / 7
						: (baseSize - (containerWidth - baseSize) / 7) / 2,
				}))
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const [isReady, setIsReady] = useState(false)

useEffect(() => {
	const positionsCalculated = 
		foldersState.left.every(pos => pos !== 0) &&
		foldersState.top.every(pos => pos !== 0) &&
		foldersState.startScroll.every(pos => pos !== 0)

	if (positionsCalculated) {
		setIsReady(true)
	}
}, [foldersState])

const safeFoldersState = useMemo(() => ({
	left: isReady ? foldersState.left : Array(8).fill(0),
	top: isReady ? foldersState.top : Array(8).fill(0),
	startScroll: isReady ? foldersState.startScroll : Array(8).fill(0),
	zIndex: foldersState.zIndex,
}), [isReady, foldersState])


	return (
		<ScrollYContainerUI height={2500} stop={1900}>
			<div
				className={styles.header}
				ref={headerRef}
				style={{ marginTop: '100px' }}
			>
				8 этапов работы нашей компании{' '}
				<span
					className={`${styles.highlight} ${state.isVisible ? styles.moove : ''}`}
					data-text='с клиентами'
				>
					с клиентами
				</span>
			</div>
			<div className={styles.folders} ref={foldersRef}>
				{isReady &&
					FOLDERS_TEXT.map((text, index) => (
						<FolderUI
							key={index + 1}
							title={text}
							top={safeFoldersState.top[index]}
							left={safeFoldersState.left[index]}
							startScroll={safeFoldersState.startScroll[index]}
							zIndex={safeFoldersState.zIndex[index]}
						/>
					))}
			</div>
		</ScrollYContainerUI>
	)
})

export default Folders
