import { FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

const InfoContainer: FC<PropsWithChildren<unknown>> = () => {
   return <div className={styles.info_container}></div>;
};

export default InfoContainer;
