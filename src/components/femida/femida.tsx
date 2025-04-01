import { useEffect, useState, useRef, useMemo, RefObject } from 'react';
import { ParallaxProps, useParallax } from 'react-scroll-parallax';
import styles from './femida.module.css';
import { FemidaSvg, LogoUI, AnimatedHeaderUI, ShadowHeaderUI } from '../ui';
import { useScrollPosition } from '../../utils/useScrollPosition';

export const FemidaBlock = () => {
    const [containerBottom, setContainerBottom] = useState(0);
    const ref = useRef<HTMLDivElement>(null!);
    const windowHeight = useRef(window.innerHeight).current;
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
        translateY: ['1200px', '0px'],
        opacity: [0, 1],
        speed: -1,
    });

    const parallaxDescription = useParallax<HTMLDivElement>({
        ...commonParallaxProps,
        translateY: ['300px', '0px'],
        opacity: [0, 1],
        speed: -2,
    });

    const parallaxCurtain = useParallax<HTMLDivElement>({
        ...commonParallaxProps,
        translateY: ['0%', '100%'],
        startScroll: start - windowHeight / 2,
        speed: -2,
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