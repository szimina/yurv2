import { FC, useState, useEffect, useRef, RefObject, forwardRef, useCallback, useMemo } from 'react'
import styles from './scroll-y-container.module.css'
import { ScrollYContainerUIProps } from './type'
import { throttle } from 'lodash'

export const ScrollYContainerUI: FC<
ScrollYContainerUIProps & {
		ref?: RefObject<HTMLDivElement | null>
		onTouchPositionChange?: (touchPosition: number) => void
	}
> = forwardRef(
	({ height, children, stop, marginTop = 0, onTouchPositionChange }, ref) => {
		const [state, setState] = useState({
			isFixed: false,
			isReleased: false,
			width: 0
		});
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

		const calculatePositionState = useCallback((currentScrollPosition: number, touchPosition: number) => {
			if (currentScrollPosition < touchPosition) return 'initial';
			if (currentScrollPosition < touchPosition + stop) return 'fixed';
			if (currentScrollPosition < touchPosition + height) return 'released';
			return 'bottom';
		}, [height, stop]);

		const handleScroll = useCallback(throttle(() => {
			if (!sectionRef.current) return;
	
			animationFrameId.current = requestAnimationFrame(() => {
				const currentScrollPosition = window.scrollY;
				const sectionTop = sectionRef.current?.getBoundingClientRect().top || 0;
				const touchPosition = currentScrollPosition + sectionTop;
	
				onTouchPositionChange?.(touchPosition);
	
				const positionState = calculatePositionState(currentScrollPosition, touchPosition);
	
				setState(prev => ({
					...prev,
					isFixed: positionState === 'fixed' || positionState === 'released',
					isReleased: positionState === 'released' || positionState === 'bottom'
				}));
			});
		}, 16), [calculatePositionState, onTouchPositionChange]);

 useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleScroll]);


	const updateWidth = useCallback(() => {
    if (sectionRef.current) {
      setState(prev => ({
        ...prev,
        width: sectionRef.current?.getBoundingClientRect().width || 0
      }));
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [updateWidth]);

	const containerStyle: React.CSSProperties = useMemo(() => ({
    position: state.isReleased ? 'absolute' : state.isFixed ? 'fixed' : 'relative',
    top: state.isReleased ? `${height - (height - stop)}px` : state.isFixed ? '0' : 'auto',
    width: state.isFixed ? `${state.width}px` : '100%',
  }), [state.isFixed, state.isReleased, state.width, height, stop]);

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
					style={containerStyle}
				>
					{children}
				</div>
			</section>
		)
	}
)

ScrollYContainerUI.displayName = 'ScrollYContainer'
