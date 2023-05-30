import { FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

const Message: FC<
   PropsWithChildren<{
      timestamp: string;
      text: string;
   }>
> = ({ timestamp, text }) => {
   return (
      <li className={styles.message}>
         <span className={styles.timestamp}>{timestamp} </span>
         {text}
      </li>
   );
};

export default Message;
