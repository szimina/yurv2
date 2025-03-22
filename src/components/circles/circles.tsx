import { useRef, useState, useEffect } from 'react'
import styles from './circles.module.css'
import { Parallax } from 'react-scroll-parallax'
import { ScrollYContainer, CircleUI, Logo  } from '../ui'

export const Circles = () => {
	const [mobile, setMobile] = useState(false)
	const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
	const [circleDiameter, setCircleDiameter] = useState(300)
	const [left, setLeft] = useState([0, 350, 700, 900, 500])
	const [mooveX, setMooveX] = useState([0, 0, 0, 0])
  const [mooveY, setMooveY] = useState([0, 0, 0, 0])
	const [marginTop, setMarginTop] = useState(0)
	const [startScroll, setStartScroll] = useState([0, 0, 0, 0, 0])
  const [endScroll, setEndScroll] = useState([0, 0, 0, 0, 0])


	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const scrollbarWidthValue = getComputedStyle(document.documentElement)
			.getPropertyValue('--scrollbar-width')
			.trim()
		const scrollbarWidth = Number(scrollbarWidthValue.replace(/\D/g, ''))

		const handleResize = () => {
			// Получаем реальную ширину окна
			const realWindowWidth = window.visualViewport?.width || window.innerWidth
      const realWindowHeight = window.visualViewport?.height || window.innerHeight
			const windowWidth = realWindowWidth - scrollbarWidth

			console.log('Real window width:', realWindowWidth)
			console.log('Window width (with scrollbar adjustment):', windowWidth)

			// Устанавливаем состояние mobile
			const mediaQuery = window.matchMedia(
				`(max-width: ${767 - scrollbarWidth}px)`
			)
			setMobile(mediaQuery.matches)

			// Устанавливаем состояние windowWidth
			setWindowWidth(windowWidth)
      setWindowHeight(realWindowHeight)
		}

		handleResize() // Устанавливаем начальное значение
		window.addEventListener('resize', handleResize) // Слушаем изменения
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		const containerWidth =
			containerRef.current?.getBoundingClientRect().width || 0
		const circleDiameter = !mobile
			? windowWidth / 4 - 10 > 390
				? 390
				: windowWidth / 4 - 10
			: (windowWidth - 10) / 2
		console.log(circleDiameter)

		const marginTop = windowHeight / 2 - circleDiameter / 2
		setMarginTop(marginTop)

		const gap = (windowWidth - circleDiameter * 4) / 3
		const leftOne = (containerWidth - windowWidth) / 2
		const leftTwo = leftOne + circleDiameter + gap
		const leftThree = leftTwo + circleDiameter + gap
		const leftFour = leftThree + circleDiameter + gap
		const center = containerWidth / 2 - circleDiameter / 2

		const mooveXFar = (windowWidth - circleDiameter) / 2
		const mooveXClose = mooveXFar - circleDiameter - gap
		const mooveXMobile = (windowWidth - circleDiameter) / 2 -3

		if (mobile) {
			setLeft([center, center, center, center, center])
			setMooveX([-mooveXMobile, mooveXMobile , -mooveXMobile, mooveXMobile])
      setMooveY([-circleDiameter*0.55, -circleDiameter*0.55, circleDiameter*0.55, circleDiameter*0.55])
		} else {
			setLeft([leftOne, leftTwo, leftThree, leftFour, center])
			setMooveX([mooveXFar, mooveXClose, -mooveXClose, -mooveXFar])
      setMooveY([0, 0, 0, 0])
		}

		setCircleDiameter(circleDiameter)
	}, [mobile, windowWidth, windowHeight])

	const handleTouchPositionChange = (touchPosition: number) => {
    if (mobile) {
			setStartScroll([touchPosition, touchPosition, touchPosition, touchPosition, touchPosition])
      setEndScroll([touchPosition+280*4, touchPosition+280*4, touchPosition+280*4, touchPosition+280*4, touchPosition+280*5])

		} else {
			setStartScroll([touchPosition, touchPosition + 280*2, touchPosition + 280*2, touchPosition, touchPosition+280*4])
      setEndScroll([touchPosition+280*2, touchPosition+280*4, touchPosition+280*4, touchPosition+280*2, touchPosition+280*5])

		}
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
				translateX={['0px', `${mooveX[0]}px`, 'easeInCubic']}
        translateY={['0px', `${mooveY[0]}px`, 'easeInCubic']}

				startScroll={startScroll[0]}
				endScroll={endScroll[0]}
			/>
			<CircleUI
				size={circleDiameter}
				index={2}
				text={'Комплексный подход'}
				top={marginTop}
				left={left[1]}
				translateX={['0px', `${mooveX[1]}px`, 'easeInCubic']}
        translateY={['0px', `${mooveY[1]}px`, 'easeInCubic']}
				startScroll={startScroll[1]}
				endScroll={endScroll[1]}
			/>
			<CircleUI
				size={circleDiameter}
				index={2}
				text={'Экономия времени и нервов'}
				top={marginTop}
				left={left[2]}
				translateX={['0px', `${mooveX[2]}px`, 'easeInCubic']}
        translateY={['0px', `${mooveY[2]}px`, 'easeInCubic']}

				startScroll={startScroll[2]}
				endScroll={endScroll[2]}
			/>
			<CircleUI
				size={circleDiameter}
				index={2}
				text={'Защита от коллекторов'}
				top={marginTop}
				left={left[3]}
				translateX={['0px', `${mooveX[3]}px`, 'easeInCubic']}
        translateY={['0px', `${mooveY[3]}px`, 'easeInCubic']}

				startScroll={startScroll[3]}
				endScroll={endScroll[3]}
        
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
				startScroll={startScroll[4]}
				endScroll={endScroll[4]}
				opacity={mobile? [1, 0]: [0, 1]}
			>
				<div style={{ height: '100px', width: '100px', zIndex: '6' }}>
					<Logo fill='var(--main-color)' fillOnHover='var(--main-color)' />
				</div>
			</Parallax>
		</ScrollYContainer>
	)
}

