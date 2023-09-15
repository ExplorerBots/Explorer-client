import { PropsWithChildren } from 'react';
import styles from './BlockTitle.module.scss';

interface Props {
   text: string;
}

const BlockTitle: React.FC<PropsWithChildren<Props>> = ({text}) => {
  return (
      <div className={styles.blockTitle}>
         <p className={styles.text}>{text}</p>
      </div>
     )
}

export default BlockTitle