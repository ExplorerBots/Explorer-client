import { FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

const InfoBlock: FC<PropsWithChildren<{ description: string }>> = ({
   description,
}) => {
   return (
      <div className={styles.info_block}>
         <p className={styles.info_title}></p>
         <p className={styles.info_description}>{description}</p>
      </div>
   );
};

export default InfoBlock;
