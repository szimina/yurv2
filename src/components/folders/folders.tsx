import { useEffect, useRef, useState } from 'react'
import { Folder } from '../ui'
import styles from './folders.module.css'
import { useParallax } from 'react-scroll-parallax'
import { debounce } from 'lodash'

export const Folders = () => {
	const [start, setStart] = useState<number>(0)
	const [left, setLeft] = useState<number>(0)
	const [top, setTop] = useState<number>(0)
  const [isVisible, setIsVisible]= useState<boolean>(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (ref.current) {
			setStart(ref.current.getBoundingClientRect().top)
			const viewportWidth = window.innerWidth
			const containerWidt = ref.current.getBoundingClientRect().width

				if (viewportWidth > 767) {
				setLeft((containerWidt - 300) / 7)
				setTop(300 - (containerWidt - 300) / 7)
			} else {
				setLeft((containerWidt - 200) / 7)
				setTop((200 - (containerWidt - 200) / 7) / 2)
			}
		}
	}, [])

  useEffect(() => {
    const handleScroll = () => {
      if (start === 0) return;
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition > start  && !isVisible) {
        setIsVisible(true); 
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, start]); 

	const parallax = useParallax<HTMLDivElement>({
		translateY: ['0px', '1600px'],
		startScroll: start,
		endScroll: start + 1600,
		shouldAlwaysCompleteAnimation: true,
	})

	return (
		<div
			className={styles.container}
			ref={(node) => {
				if (node) {
					parallax.ref.current = node
				}
				ref.current = node
			}}
		>
			<div className={styles.header}>
				8 этапов работы нашей компании{' '}
				<span className={`${styles.highlight} ${isVisible ? styles.moove : ''}`}>с клиентами</span>
			</div>
			<div className={styles.folders}>
				<Folder
					title={'Консультация'}
					startScroll={start}
					top={top}
					left={0}
					zIndex={8}
				/>
				<Folder
					title={'Анализ долгов'}
					startScroll={start + 200}
					top={0}
					left={left + 5}
					zIndex={7}
				/>
				<Folder
					title={'Сбор документов'}
					startScroll={start + 400}
					top={top * 1.5}
					left={left * 2}
					zIndex={6}
				/>
				<Folder
					title={'Подача заявления'}
					startScroll={start + 600}
					top={top * 0.3}
					left={left * 3 - 7}
					zIndex={5}
				/>
				<Folder
					title={'Судебное сопровождение'}
					startScroll={start + 800}
					top={top * 0.1}
					left={left * 4}
					zIndex={4}
				/>
				<Folder
					title={'Взаимодействие с кредиторами'}
					startScroll={start + 1000}
					top={top * 1.2}
					left={left * 5 - 5}
					zIndex={3}
				/>
				<Folder
					title={'Реализация имущества'}
					startScroll={start + 1200}
					top={top * 0.1}
					left={left * 6 + 7}
					zIndex={2}
				/>
				<Folder
					title={'Завершение процедуры'}
					startScroll={start + 1400}
					top={top * 1.8}
					left={left * 7}
					zIndex={1}
				/>
			</div>
		</div>
	)
}
