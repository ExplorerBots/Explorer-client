import Image from 'next/image';
import { FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

const Notify: FC<
   PropsWithChildren<{
      type: string;
      title: string;
      description: string;
      timestamp: string;
      sideImage: string;
   }>
> = ({ type, title, description, sideImage, timestamp }) => {
   return (
      <li className={styles.notify} data-notify={type}>
         <div className={styles.side}>
            <Image src={sideImage} alt="" width={24} height={24} />
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
