import { FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

const BonusBlock: FC<
   PropsWithChildren<{ title: string; description: string }>
> = ({ title, description }) => {
   return (
      <div className={styles.bonus_block}>
         <p className={styles.bonus_title}>{title}</p>
         <p className={styles.bonus_description}>{description}</p>
      </div>
   );
};

export default BonusBlock;
