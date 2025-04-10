
import styles from './net.module.css';
import { useRef, useMemo, useState, useEffect, useLayoutEffect, useCallback } from 'react';

import { useScrollPosition } from '../../utils/useScrollPosition';
import { ShadowHeaderUI, SlipUI, NetSvg, ScrollYContainerUI } from '../ui';
import { LabelUI } from '../ui/label';


const SCROLL_STEP = 900;
const SLIP_DATA = [
  {
    header: 'Консультируем и сопровождаем',
    buttons: ['Юридически', 'Финансово', 'Психологически'],
  },
  {
    header: 'Защищаем от кредиторов',
    buttons: ['Коллекторы', 'Банки', 'МФО', 'Суды'],
  },
  {
    header: 'Оформляем документы',
    buttons: ['Заявления', 'Отчеты', 'Ходатайства', 'Исковые'],
  },
  {
    header: 'Ведем судебные процессы',
    buttons: ['Арбитраж', 'Апелляции', 'Исполнительное', 'Обжалование'],
  },
];

const Net: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null!);
  const start = useScrollPosition(divRef);

  const netContainerStyle = window.innerWidth <= 768 ? 300 : 500;

  const [distance, setDistance] = useState(0)

	const handleResize = useCallback(() => {
		const windowWidth = window.visualViewport?.width || window.innerWidth
		const moove = windowWidth - 300
		setDistance(moove)
	}, [])

	useLayoutEffect(() => {
		handleResize()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [handleResize])




  const slips = useMemo(() => (
    SLIP_DATA.map(({ header, buttons }, index) => (
      <LabelUI
        key={header}
        startScroll={start + index * SCROLL_STEP}
        endScroll={start + (index + 1) * SCROLL_STEP}
        header={header}
        buttons={buttons}
        translateX={['300px', `-${distance}px`]}
      />
    ))
  ), [start]);

  return (
    <ScrollYContainerUI height={5000} stop={4500}>
      <div className={styles.netcontainer}>
        <div>
          <ShadowHeaderUI
            text={[
              'снижаем потери',
              'за счет грамотного',
              'планирования процедуры',
              'банкротства',
            ]}
            start={start}
            marginTop={netContainerStyle}
          />
        </div>
        <div className={styles.net}>
          <NetSvg />
        </div>
      </div>
      <div className={styles.slips} ref={divRef}>
        {slips}
      </div>
    </ScrollYContainerUI>
  );
};

export default Net;
