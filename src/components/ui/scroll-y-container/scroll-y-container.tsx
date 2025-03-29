import { FC, useState, useEffect, useRef, RefObject, forwardRef } from 'react'
import styles from './scroll-y-container.module.css'
import { ScrollYContainerProps } from './type'

export const ScrollYContainer: FC<
	ScrollYContainerProps & {
		ref?: RefObject<HTMLDivElement | null>
		onTouchPositionChange?: (touchPosition: number) => void
	}
> = forwardRef(
	({ height, children, stop, marginTop = 0, onTouchPositionChange }, ref) => {
		const [isFixed, setIsFixed] = useState<boolean>(false)
		const [isReleased, setIsReleased] = useState<boolean>(false)
		const [width, setWidth] = useState<number>(0)

		const containerRef = useRef<HTMLDivElement>(null)
		const sectionRef = useRef<HTMLDivElement>(null)
		const animationFrameId = useRef<number | null>(null)

		const setRefs = (element: HTMLDivElement | null) => {
			if (sectionRef) {
				sectionRef.current = element
			}

			if (typeof ref === 'function') {
				ref(element)
			} else if (ref) {
				ref.current = element
			}
		}

		useEffect(() => {
			const handleScroll = () => {
				if (animationFrameId.current !== null) {
					cancelAnimationFrame(animationFrameId.current)
				}

				animationFrameId.current = requestAnimationFrame(() => {
					const currentScrollPosition = window.scrollY
					const sectionTop =
						sectionRef.current?.getBoundingClientRect().top || 0
					const sectionOffsetTop = currentScrollPosition + sectionTop
					const touchPosition = sectionOffsetTop

					if (onTouchPositionChange) {
						onTouchPositionChange(touchPosition)
					}

					if (currentScrollPosition < touchPosition) {
						if (isFixed) setIsFixed(false)
						if (isReleased) setIsReleased(false)
					} else if (
						currentScrollPosition >= touchPosition &&
						currentScrollPosition < touchPosition + stop
					) {
						if (!isFixed) setIsFixed(true)
						if (isReleased) setIsReleased(false)
					} else if (
						currentScrollPosition >= touchPosition + stop &&
						currentScrollPosition < touchPosition + height
					) {
						if (!isFixed) setIsFixed(true)
						if (!isReleased) setIsReleased(true)
					} else if (currentScrollPosition >= touchPosition + height) {
						if (isFixed) setIsFixed(false)
						if (!isReleased) setIsReleased(true)
					}
				})
			}

			window.addEventListener('scroll', handleScroll)
			return () => {
				window.removeEventListener('scroll', handleScroll)
				if (animationFrameId.current !== null) {
					cancelAnimationFrame(animationFrameId.current)
				}
			}
		}, [isFixed, height, isReleased, stop, onTouchPositionChange])

		useEffect(() => {
			const updateWidth = () => {
				if (sectionRef.current) {
					const containerWidth =
						sectionRef.current.getBoundingClientRect().width
					setWidth(containerWidth)
				}
			}

			updateWidth()
			window.addEventListener('resize', updateWidth)
			return () => {
				window.removeEventListener('resize', updateWidth)
			}
		}, [])

		return (
			<section
				style={{
					height: `${height}px`,
					position: 'relative',
					// border: '1px solid white',
					marginTop: `${marginTop}px`,
				}}
				ref={setRefs}
			>
				<div
					ref={containerRef}
					className={styles.container}
					style={{
						position: isReleased ? 'absolute' : isFixed ? 'fixed' : 'relative',
						top: isReleased
							? `${height - (height - stop)}px`
							: isFixed
								? '0'
								: 'auto',
						width: isFixed ? `${width}px` : '100%',
					}}
				>
					{children}
				</div>
			</section>
		)
	}
)

ScrollYContainer.displayName = 'ScrollYContainer'
