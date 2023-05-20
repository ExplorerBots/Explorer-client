import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import styles from './styles.module.scss';

const ClassicBotItem: FC<
   PropsWithChildren<{
      username: string;
      botId: number;
      server: string;
      status: string;
      days_left: number;
   }>
> = ({ username, botId, server, status, days_left }) => {
   const router = useRouter();

   const clickEnterHandler = (botId: number) => {
      router.push(`/control-panel/bots/${botId}`);
   };

   const clickSettingsHandler = (botId: number) => {
      router.push(`/control-panel/bots/${botId}/settings`);
   };

   return (
      <div className={styles.classic_bot}>
         <div className={styles.header}>
            <div className={styles.type}>Classic</div>
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
               <span className={styles.green}>{status}</span>
            </p>
         </div>
         <div className={styles.bottom}>
            <div className={styles.buttons}>
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
            </div>
            <p className={styles.days_left}>Осталось дней: {days_left}</p>
         </div>
      </div>
   );
};

export default ClassicBotItem;
