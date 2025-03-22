import { useRef, useState, useEffect } from 'react'
import styles from './test.module.css'
import { ScrollYContainer } from '../scroll-y-container'
import { CircleUI } from '../circle'
import { Parallax } from 'react-scroll-parallax'
import { Logo } from '../logo'

const AnimatedCircles = () => {
	const [circleDiameter, setCircleDiameter] = useState(300)
	const [left, setLeft] = useState([0, 350, 700, 900, 500])
	const [moove, setMoove] = useState([0, 0, 0, 0])
	const [marginTop, setMarginTop] = useState(0)
	const [startScroll, setStartScroll] = useState(0)

	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const containerWidth =
			containerRef.current?.getBoundingClientRect().width || 0
		const scrollbarWidthValue = getComputedStyle(document.documentElement)
			.getPropertyValue('--scrollbar-width')
			.trim()
		const scrollbarWidth = Number(scrollbarWidthValue.replace(/\D/g, ''))
		const windowWidth = window.innerWidth - scrollbarWidth
		const windowHeight = window.innerHeight
		const circleDiameter =
			windowWidth / 4 - 10 > 390 ? 390 : windowWidth / 4 - 10

		const marginTop = windowHeight / 2 - circleDiameter / 2
		setMarginTop(marginTop)

		const gap = (windowWidth - circleDiameter * 4) / 3
		const leftOne = (containerWidth - windowWidth) / 2
		const leftTwo = leftOne + circleDiameter + gap
		const leftThree = leftTwo + circleDiameter + gap
		const leftFour = leftThree + circleDiameter + gap
		const leftFive = containerWidth / 2 - circleDiameter / 2

		const mooveOne = windowWidth / 2 - circleDiameter / 2
		const mooveTwo = mooveOne - circleDiameter - gap
		const mooveThree = -mooveTwo
		const mooveFour = -mooveOne

		setLeft([leftOne, leftTwo, leftThree, leftFour, leftFive])
		setMoove([mooveOne, mooveTwo, mooveThree, mooveFour])
		setCircleDiameter(circleDiameter)
	}, [])

	const handleTouchPositionChange = (touchPosition: number) => {
		setStartScroll(touchPosition)
	}

	return (
		<ScrollYContainer
			height={2000}
			stop={2000 - circleDiameter - marginTop}
			ref={containerRef}
			marginTop={-marginTop}
			onTouchPositionChange={handleTouchPositionChange}
		>
			<CircleUI
				size={circleDiameter}
				index={1}
				text={'Законность и прозрачность'}
				top={marginTop}
				left={left[0]}
				translateX={['0px', `${moove[0]}px`, 'easeInCubic']}
				startScroll={startScroll + 280 * 2}
				endScroll={startScroll + 280 * 4}
			/>
			<CircleUI
				size={circleDiameter}
				index={2}
				text={'Комплексный подход'}
				top={marginTop}
				left={left[1]}
				translateX={['0px', `${moove[1]}px`, 'easeInCubic']}
				startScroll={startScroll}
				endScroll={startScroll + 280 * 2}
			/>
			<CircleUI
				size={circleDiameter}
				index={2}
				text={'Экономия времени и нервов'}
				top={marginTop}
				left={left[2]}
				translateX={['0px', `${moove[2]}px`, 'easeInCubic']}
				startScroll={startScroll}
				endScroll={startScroll + 280 * 2}
			/>
			<CircleUI
				size={circleDiameter}
				index={2}
				text={'Защита от коллекторов'}
				top={marginTop}
				left={left[3]}
				translateX={['0px', `${moove[3]}px`, 'easeInCubic']}
				startScroll={startScroll + 280 * 2}
				endScroll={startScroll + 280 * 4}
			/>
			<Parallax
				className={styles.circle}
				style={{
					height: `${circleDiameter}px`,
					width: `${circleDiameter}px`,
					borderRadius: `${circleDiameter}px`,
					zIndex: `5`,
					top: `${marginTop}px`,
					left: `${left[4]}px`,
				}}
				startScroll={startScroll + 280 * 4}
				endScroll={startScroll + 280 * 5}
				opacity={[0, 1]}
			>
				<div style={{ height: '100px', width: '100px', zIndex: '6' }}>
					<Logo fill='var(--main-color)' fillOnHover='var(--main-color)' />
				</div>
			</Parallax>
		</ScrollYContainer>
	)
}

export default AnimatedCircles
