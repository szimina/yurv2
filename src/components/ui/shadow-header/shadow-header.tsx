import { useEffect, useState, useRef, FC } from 'react'
import { Parallax, useParallax } from 'react-scroll-parallax'
import styles from './shadow-header.module.css'
import { ShadowHeaderUIProps } from './type'
import useWindowHeight from '../../../utils/useWindowHeight'

export const ShadowHeaderUI: FC<ShadowHeaderUIProps> = ({
	text,
	start,	
	marginTop=0,
}) => {

  const windowHeight = useWindowHeight();

	// const parallaxTulle = useParallax<HTMLDivElement>({
	// 	translateX: ['0%', '100%', 'easeOut'],
	// 	startScroll: start - windowHeight / 2 ,
	// 	endScroll: start + windowHeight,
	// })

	// return (
	// 	<Parallax
	// 		translateX={['-5%', '10%', 'easeOutCubic']}
	// 		translateY={['5%', '-5%', 'easeOutCubic']}
	// 	>
	// 		<div style={{marginTop: `${marginTop}px`}}>
	// 		<div className={styles.text}>
	// 			{text.map((phrase, index) => (
	// 				<p key={index}>{phrase}</p>
	// 			))}
	// 			{/* <div ref={parallaxTulle.ref} className={styles.tulle}></div> */}
	// 		</div>
	// 		</div>
	// 	</Parallax>
	// )

	return (
    <Parallax
      translateX={['-5%', '10%', 'easeOutCubic']}
      translateY={['5%', '-5%', 'easeOutCubic']}
      startScroll={start - windowHeight / 2}
      endScroll={start + windowHeight}
    >
      <div style={{marginTop: `${marginTop}px`}}>
        <div className={styles.text}>
          {text.map((phrase, index) => (
            <p key={index}>{phrase}</p>
          ))}
          <div className={styles.tulle}></div>
        </div>
      </div>
    </Parallax>
  );
}
