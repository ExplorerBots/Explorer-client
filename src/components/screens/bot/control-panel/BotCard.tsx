import styles from '@/app/bot/control-panel/_styles.module.scss';
import { routes } from '@/constants';
import { IBot } from '@/interfaces';
import { getDaysLeft } from '@/utils/get-days-left';
import Image from 'next/image';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

interface IBotCardProps {
   username: string;
   botId: number;
   server: string;
   status: string;
   endDate: number;
   isPremium: boolean;
   setCurrentExpired: (bot: IBot) => void;
}

const BotCard: FC<PropsWithChildren<IBotCardProps>> = ({
   username,
   botId,
   server,
   status,
   endDate,
   isPremium,
   setCurrentExpired,
}) => {
   return (
      <div className={styles.bot_card}>
         {isPremium && (
            <div className={styles.premium_crown}>
               <Image src="/images/crown.png" alt="" width={60} height={40} />
            </div>
         )}
         <div className={styles.header}>
            <div className={styles.type} data-premium={isPremium}>
               {isPremium ? 'Premium' : 'Classic'}
            </div>
         </div>
         <div className={styles.center}>
            <p className={styles.username}>
               <span className={styles.description}>Бот: </span> {username}
            </p>
            <p className={styles.id}>
               <span className={styles.description}>Айди: </span>
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
                  <>
                     <button
                        className={styles.expired_button}
                        onClick={() =>
                           setCurrentExpired({
                              username,
                              id: botId,
                              server,
                              status,
                              endDate,
                              isPremium,
                              whitelist: [],
                              macroses: [],
                              timers: [],
                              activeMacrosId: 0,
                           })
                        }
                     >
                        Продлить
                     </button>
                  </>
               ) : (
                  <>
                     <Link
                        className={styles.control_link}
                        href={routes.CONTROL_PANEL + botId}
                     >
                        Управление
                     </Link>
                     <Link
                        className={styles.settings_link}
                        href={routes.SETTINGS + botId}
                     >
                        <Image
                           src="/svg/settings.svg"
                           alt={''}
                           width={20}
                           height={20}
                        />
                     </Link>
                  </>
               )}
            </div>
            <p className={styles.days_left}>
               Осталось дней: {getDaysLeft(String(endDate))}
            </p>
         </div>
      </div>
   );
};

export default BotCard;
