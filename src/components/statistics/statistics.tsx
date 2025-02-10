import { FC } from 'react';
import { StatisticCard } from '../ui/statistic';
import styles from "./statistics.module.css";


export const Statistics = () => (
  <div className={styles.statistics}>
  <StatisticCard stroke={'#adff2f'} header={"99%"} text={"успешных процедур"}/>
  <StatisticCard stroke={'#adff2f'} header={">10"} text={"опытных юристов"}/>
  <StatisticCard stroke={'#adff2f'} header={"12"} text={"месяцев на дело"}/>

  </div>
);
