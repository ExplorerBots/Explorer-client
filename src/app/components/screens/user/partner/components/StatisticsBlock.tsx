import { FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

interface IStatisticsBlockProps {}

const StatisticsBlock: FC<PropsWithChildren<IStatisticsBlockProps>> = () => {
   return (
      <div className={styles.statistics_block}>
         <div className={styles.block_title}>Статистика </div>
         <div className={styles.statistics}></div>
      </div>
   );
};

export default StatisticsBlock;
