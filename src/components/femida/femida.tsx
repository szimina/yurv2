import { useEffect, useState, useRef, useMemo, RefObject } from 'react';
import { ParallaxProps, useParallax } from 'react-scroll-parallax';
import styles from './femida.module.css';
import { FemidaSvg, LogoUI, AnimatedHeaderUI, ShadowHeaderUI } from '../ui';
import { useScrollPosition } from '../../utils/useScrollPosition';
import useWindowHeight from '../../utils/useWindowHeight';

const FemidaBlock = () => {
    const [containerBottom, setContainerBottom] = useState(0);
    const ref = useRef<HTMLDivElement>(null!);
    const windowHeight = useWindowHeight();
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
      setDisabled(false);
    }, []);

    const start = useScrollPosition(ref);

    useEffect(() => {
        const handleLoad = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setContainerBottom(window.scrollY + rect.bottom);
            }
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    const commonParallaxProps: Pick<ParallaxProps, 'easing' | 'startScroll' | 'endScroll'>  = useMemo(() => ({
        easing: 'easeOut',
        startScroll: start - windowHeight / 3,
        endScroll: start - 100,
    }), [start, windowHeight]);

    const parallaxLogo = useParallax<HTMLDivElement>({
        ...commonParallaxProps,
        translateY: ['800px', '0px'],
        opacity: [0, 1],
        disabled,
        // speed: -1,
    });

    const parallaxDescription = useParallax<HTMLDivElement>({
        ...commonParallaxProps,
        translateY: ['300px', '0px'],
        opacity: [0, 1],
        disabled,
        // speed: -2,
    });

    const parallaxCurtain = useParallax<HTMLDivElement>({
        ...commonParallaxProps,
        translateY: ['0%', '100%'],
        disabled
        // speed: -2,
    });

    return (
        <div ref={ref} className={styles.container}>
            <AnimatedHeaderUI text={'лидеры в'} start={start - windowHeight} />
            
            <div className={styles.logo} ref={parallaxLogo.ref}>
                <LogoUI fill='var(--main-color)' fillOnHover='var(--main-color)' />
            </div>
            
            <div className={styles.content}>
                <p className={styles.text}>Наша цель — законно вывести</p>
                <p className={styles.text}>вас из долгового кризиса!</p>
                <div ref={parallaxCurtain.ref} className={styles.curtain}></div>
            </div>

            <div className={styles.description} ref={parallaxDescription.ref}>
                списании долгов
            </div>
            
            <div className={styles.svg}>
                <FemidaSvg />
            </div>
            
            <ShadowHeaderUI
                start={containerBottom - windowHeight / 3}
                text={[
                    'Добиваемся результатов',
                    'за счет жестких принципов',
                    'и мягких подходов',
                ]}
                marginTop={15}
            />
        </div>
    );
};

export default FemidaBlock;