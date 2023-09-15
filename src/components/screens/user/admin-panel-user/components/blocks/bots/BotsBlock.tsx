import { wheelControl } from '@/app/bot/control-panel/utils';
import { IBot } from '@/interfaces';
import { getDaysLeft } from '@/utils/get-days-left';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import styles from '../../../styles.module.scss';
import ConfigBotModal from '../../modals/ConfigBotModal';

const BotsBlock: FC = () => {
   const { user } = useContext(UserContext);
   const botsRef = useRef(null);

   useEffect(() => wheelControl(botsRef), []);

   const [currentBot, setCurrentBot] = useState<IBot | null>(null);

   return (
      <div className={styles.block}>
         <div className={styles.block_title}>Боты</div>
         <div className={styles.bots} ref={botsRef}>
            {user?.bots.map((bot) => (
               <div className={styles.bot} key={bot.id}>
                  <div className={styles.type}>
                     <span className={styles.description}>Тип: </span>{' '}
                     {bot.isPremium ? 'Premium' : 'Classic'}
                  </div>
                  <div className={styles.username}>
                     <span className={styles.description}>Ник: </span>{' '}
                     {bot.username}
                  </div>
                  <div className={styles.id}>
                     <span className={styles.description}>Айди: </span> {bot.id}
                  </div>
                  <div className={styles.server}>
                     <span className={styles.description}>Сервер: </span>{' '}
                     {bot.server}
                  </div>
                  <div className={styles.status}>
                     <span className={styles.description}>Статус: </span>{' '}
                     {bot.status}
                  </div>
                  <div className={styles.status}>
                     <span className={styles.description}>Осталось: </span>{' '}
                     {bot.status !== 'expired'
                        ? getDaysLeft(String(bot.endDate)).toLocaleString() +
                          ' дней'
                        : 'истек'}
                  </div>
                  <div className={styles.buttons}>
                     <button className={styles.button}>Контроль</button>
                     <button
                        className={styles.button}
                        onClick={() => setCurrentBot(bot)}
                     >
                        Конфиг
                     </button>
                  </div>
               </div>
            ))}
         </div>
         <ConfigBotModal bot={currentBot} setBot={setCurrentBot} />
      </div>
   );
};

export default BotsBlock;
