
import styles from './net.module.css';
import { useRef, useMemo } from 'react';

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

  const slips = useMemo(() => (
    SLIP_DATA.map(({ header, buttons }, index) => (
      <LabelUI
        key={header}
        startScroll={start + index * SCROLL_STEP}
        endScroll={start + (index + 1) * SCROLL_STEP}
        header={header}
        buttons={buttons}
        index={index}
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
