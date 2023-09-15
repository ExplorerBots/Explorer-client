'use client';
import { BotsContext } from '@/app/bot/control-panel/BotsProvider';
import styles from '@/app/bot/control-panel/_styles.module.scss';
import { wheelControl } from '@/app/bot/control-panel/utils';
import { IBot } from '@/interfaces';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import BotCard from './BotCard';

export const BotsContainer = () => {
   const ref = useRef<HTMLDivElement>(null);
   const [extendBot, setExtendBot] = useState<IBot | null>(null);

   useEffect(() => wheelControl(ref), []);

   const { bots, botsIsLoading } = useContext(BotsContext);

   return (
      <div className={styles.bots_container}>
         <div className={styles.content} ref={ref}>
            {botsIsLoading ? (
               <div className={styles.loading}>
                  <Image
                     src="/svg/preloader.svg"
                     width={100}
                     height={100}
                     alt=""
                  />
               </div>
            ) : (
               <>
                  {bots.length ? (
                     bots.map((bot, i) => (
                        <BotCard
                           key={i}
                           setCurrentExpired={setExtendBot}
                           isPremium={bot.isPremium}
                           username={bot.username}
                           botId={bot.id}
                           server={bot.server}
                           status={bot.status}
                           endDate={bot.endDate}
                        />
                     ))
                  ) : (
                     <div className={styles.bots_null}>
                        <p className={styles.text}>
                           У тебя нету ни одного бота, пора бы тебе его купить
                           :3
                        </p>
                     </div>
                  )}
               </>
            )}
         </div>
      </div>
   );
};
