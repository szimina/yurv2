import { useRef, useState, memo, useCallback, useMemo, useEffect } from 'react';
import styles from './papkas.module.css';
import { ScrollYContainerUI} from '../ui';
import { PapkaUI } from '../ui/papka';
import { useScrollPosition } from '../../utils/useScrollPosition';

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

const Papkas = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const foldersRef = useRef<HTMLDivElement>(null);

  const start = useScrollPosition(containerRef) + 400

  const [stateContainer, setStateContainer] = useState({
		isVisible: false,
		left: 0,
		top: 0,
	})

  useEffect(() => {
		const handleResize = () => {
			if (!foldersRef.current) return;
			
			if (foldersRef.current) {
				const viewportWidth = window.innerWidth
				const containerWidth = containerRef.current.getBoundingClientRect().width
				const isDesktop = viewportWidth > 767
				const baseSize = isDesktop ? 300 : 200

				setStateContainer((prev) => ({
					...prev,
					left: (containerWidth - baseSize) / 7,
					top: isDesktop
						? baseSize - (containerWidth - baseSize) / 7  
						: (baseSize - (containerWidth - baseSize) / 7) / 1,
				}))
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])


  const [stateFolders, setStateFolders] = useState({
    left: [0, 0, 0, 0, 0, 0, 0, 0],
    top: [0, 0, 0, 0, 0, 0, 0, 0],
    startScroll: [0, 0, 0, 0, 0, 0, 0, 0],
    endScroll: [0, 0, 0, 0, 0, 0, 0, 0],
    zIndex: [8, 7, 6, 5, 4, 3, 2, 1],
  });
  

  const { left, top, startScroll, endScroll } = useMemo(() => {
		return {
			top: [
				stateContainer.top,
				stateContainer.top * 0.4,
				stateContainer.top * 1.5,
				stateContainer.top * 0.3,
				stateContainer.top * 0.1,
				stateContainer.top * 1.8,
				stateContainer.top * 0.6,
				stateContainer.top * 1.2,
			],
			left: [
				1,
				stateContainer.left + 5,
				stateContainer.left * 2,
				stateContainer.left * 3 - 7,
				stateContainer.left * 4,
				stateContainer.left * 5 - 5,
				stateContainer.left * 6 + 7,
				stateContainer.left * 7,
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
      endScroll: [
				start + 400,
				start + 600,
				start + 800,
				start + 1000,
				start + 1200,
				start + 1400,
				start + 1600,
				start + 1800,
			],
		}
	}, [stateContainer.top, stateContainer.left, start])

  useEffect(() => {
		setStateFolders((prev) => ({
			...prev,
			left,
			top,
			startScroll,
      endScroll
		}))
	}, [stateContainer.left, stateContainer.top, start])


  const handleScroll = useCallback(() => {
		if (start === 0) return
		const currentScrollPosition = window.scrollY
		if (currentScrollPosition > start - 300 && !stateContainer.isVisible) {
			setStateContainer((prev) => ({ ...prev, isVisible: true }))
		}
	}, [stateContainer.isVisible, start])

  useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: false })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [handleScroll])

	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		const positionsCalculated =
    stateFolders.left.every((pos) => pos !== 0) &&
    stateFolders.top.every((pos) => pos !== 0)

		if (positionsCalculated) {
			setIsReady(true)
		}
	}, [stateFolders])


  return (
    <ScrollYContainerUI
      height={2500}
      stop={1900}
      ref={containerRef}
    >
     <div
				className={styles.header}
				style={{ marginTop: '100px' }}
			>
				8 этапов работы нашей компании{' '}
				<span
					className={`${styles.highlight} ${stateContainer.isVisible ? styles.moove : ''}`}
					data-text='с клиентами'
				>
					с клиентами
				</span>
			</div>
      <div ref={foldersRef} className={styles.folders}>
      {isReady && FOLDERS_TEXT.map((text, index) => (
        <PapkaUI
          key={text}
          size={200}
          top={stateFolders.top[index]}
          text={FOLDERS_TEXT[index]}
          left={stateFolders.left[index]}
          translateY={['0px', `-200px`, 'easeIn']}
          startScroll={stateFolders.startScroll[index]}
          endScroll={stateFolders.endScroll[index]}
          zIndex={stateFolders.zIndex[index]}
        />
      ))}</div>

    </ScrollYContainerUI>
  );
});

export default Papkas;