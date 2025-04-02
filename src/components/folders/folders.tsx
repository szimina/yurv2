import { useCallback, useEffect, useRef, useState } from 'react'
import { FolderUI, ScrollYContainerUI } from '../ui'
import styles from './folders.module.css'
import { useScrollPosition } from '../../utils/useScrollPosition'

const FOLDERS_DATA = [
	{
		title: 'Консультация',
		startOffset: 0,
		topCalc: (top: number) => top,
		leftCalc: (_left: number) => 0,
		zIndex: 8,
	},
	{
		title: 'Анализ долгов',
		startOffset: 200,
		topCalc: (_top: number) => 0,
		leftCalc: (left: number) => left + 5,
		zIndex: 7,
	},
	{
		title: 'Сбор документов',
		startOffset: 400,
		topCalc: (top: number) => top * 1.5,
		leftCalc: (left: number) => left * 2,
		zIndex: 6,
	},
	{
		title: 'Подача заявления',
		startOffset: 600,
		topCalc: (top: number) => top * 0.3,
		leftCalc: (left: number) => left * 3 - 7,
		zIndex: 5,
	},
	{
		title: 'Судебное сопровождение',
		startOffset: 800,
		topCalc: (top: number) => top * 0.1,
		leftCalc: (left: number) => left * 4,
		zIndex: 4,
	},
	{
		title: 'Взаимодействие с кредиторами',
		startOffset: 1000,
		topCalc: (top: number) => top * 1.8,
		leftCalc: (left: number) => left * 5 - 5,
		zIndex: 3,
	},
	{
		title: 'Реализация имущества',
		startOffset: 1200,
		topCalc: (top: number) => top * 0.1,
		leftCalc: (left: number) => left * 6 + 7,
		zIndex: 2,
	},
	{
		title: 'Завершение процедуры',
		startOffset: 1400,
		topCalc: (top: number) => top * 1.2,
		leftCalc: (left: number) => left * 7,
		zIndex: 1,
	},
]

const Folders = () => {
	const [state, setState] = useState({
		left: 0,
		top: 0,
		isVisible: false,
	})

	const headerRef = useRef<HTMLDivElement>(null!)
	const foldersRef = useRef<HTMLDivElement>(null)
	const start = useScrollPosition(headerRef)

	useEffect(() => {
		const handleResize = () => {
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

	const handleScroll = useCallback(() => {
		if (start === 0) return
		const currentScrollPosition = window.scrollY
		if (currentScrollPosition > start - 100 && !state.isVisible) {
			setState((prev) => ({ ...prev, isVisible: true }))
		}
	}, [state.isVisible, start])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [handleScroll])

	return (
		<ScrollYContainerUI height={2500} stop={1700}>
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
				{FOLDERS_DATA.map((folder) => (
					<FolderUI
						key={folder.title}
						title={folder.title}
						startScroll={start + folder.startOffset}
						top={folder.topCalc(state.top)}
						left={folder.leftCalc(state.left)}
						zIndex={folder.zIndex}
					/>
				))}
			</div>
		</ScrollYContainerUI>
	)
}


export default Folders;