import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import Image from 'next/image';
import { FC, PropsWithChildren } from 'react';

const Notify: FC<
   PropsWithChildren<{
      type: 'success' | 'error' | 'warning';
      title: string;
      description: string;
      timestamp: string;
   }>
> = ({ type, title, description, timestamp }) => {
   return (
      <li className={styles.notify} data-notify={type}>
         <div className={styles.side}>
            {type === 'success' ? (
               <></>
            ) : type === 'error' ? (
               <Image
                  src={'/svg/alert-circle.svg'}
                  alt=""
                  width={24}
                  height={24}
               />
            ) : (
               type === 'warning' && <></>
            )}
         </div>
         <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
            <div className={styles.timestamp}>{timestamp}</div>
         </div>
      </li>
   );
};

export default Notify;
