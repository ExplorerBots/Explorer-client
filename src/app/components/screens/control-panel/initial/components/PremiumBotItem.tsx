import { getDaysLeft } from '@/app/utils/get-days-left';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

const PremiumBotItem: FC<
   PropsWithChildren<{
      username: string;
      botId: number;
      server: string;
      status: string;
      endDate: string;
   }>
> = ({ username, botId, server, status, endDate }) => {
   const router = useRouter();

   const clickEnterHandler = (botId: number) => {
      router.push(`/control-panel/bots/${botId}`);
   };

   const clickSettingsHandler = (botId: number) => {
      router.push(`/settings-bot/${botId}`);
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
               <span
                  className={
                     status === 'online'
                        ? styles.green
                        : status === 'offline'
                        ? styles.red
                        : status === 'expired'
                        ? styles.orange
                        : ''
                  }
               >
                  {status}
               </span>
            </p>
         </div>
         <div className={styles.bottom}>
            <div className={styles.buttons}>
               {status === 'expired' ? (
                  <button
                     onClick={() => clickEnterHandler(botId)}
                     className={styles.button_start}
                  >
                     Продлить
                  </button>
               ) : (
                  <>
                     <button
                        onClick={() => clickEnterHandler(botId)}
                        className={styles.button_start}
                     >
                        Управление
                     </button>
                     <button
                        onClick={() => clickSettingsHandler(botId)}
                        className={styles.settings}
                     >
                        <Image
                           src="/svg/settings.svg"
                           alt={''}
                           width={20}
                           height={20}
                        />
                     </button>
                  </>
               )}
            </div>
            <p className={styles.days_left}>
               Осталось дней: {getDaysLeft(endDate)}
            </p>
         </div>
      </div>
   );
};

export default PremiumBotItem;
