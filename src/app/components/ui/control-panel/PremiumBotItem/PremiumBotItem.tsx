import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import styles from './styles.module.scss';

const PremiumBotItem: FC<
   PropsWithChildren<{
      username: string;
      botId: number;
      server: string;
      status: string;
      days_left: number;
   }>
> = ({ username, botId, server, status, days_left }) => {
   const router = useRouter();

   const clickHandler = (botId: number) => {
      router.push(`/control-panel/bots/${botId}`);
   };

   return (
      <div className={styles.premium_bot}>
         <div className={styles.premium_crown}>
            <Image src="/images/crown.png" alt="" width={60} height={40} />
         </div>
         <div className={styles.header}>
            <div className={styles.type}>Premium</div>
         </div>
         <div className={styles.center}>
            <p className={styles.username}>
               <span className={styles.description}>Бот: </span> {username}
            </p>
            <p className={styles.id}>
               {' '}
               <span className={styles.description}>Id: </span>
               {botId}
            </p>
            <p className={styles.server}>
               <span className={styles.description}>Сервер: </span> {server}
            </p>
            <p className={styles.status}>
               <span className={styles.description}>Статус: </span>
               <span className={styles.red}>{status}</span>
            </p>
         </div>
         <div className={styles.bottom}>
            <button
               onClick={() => clickHandler(botId)}
               className={styles.button_start}
            >
               Управление
            </button>
            <p className={styles.days_left}>Осталось дней: {days_left}</p>
         </div>
      </div>
   );
};

export default PremiumBotItem;
