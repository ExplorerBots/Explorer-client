import { limits } from '@/app/constants';
import { BotContext } from '@/app/context/BotContext';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../../../styles.module.scss';
import { TimersContext } from './context/TimersContext';
import { useCreateTimer } from './hooks/useCreateTimer';
import { TimerCard } from './TimerCard';

export const Timers = () => {
   const { bot } = useContext(BotContext);
   const { timers, setTimers, enableTimers, setEnableTimers } =
      useContext(TimersContext);

   const [currentLimit, setCurrentLimit] = useState<number>(0);

   const {
      mutateAsync: createTimer,
      isLoading: createTimerLoading,
      error: createTimerError,
   } = useCreateTimer();

   const handleCreateTimer = async () => {
      if (timers!.length >= currentLimit) {
         toast.error('У тебя больше нет места для нового таймера');
         return;
      }

      const response = await createTimer({
         botId: bot!.id,
         interval: 0,
         message: '',
      });

      if (!response) return;

      setTimers([...timers!, response]);
   };

   useEffect(() => bot?.timers && setTimers(bot?.timers), [bot?.timers]);

   useEffect(() => {
      if (bot?.isPremium) {
         setCurrentLimit(limits.PREMIUM_TIMER);
      } else {
         setCurrentLimit(limits.CLASSIC_TIMER);
      }
   }, [bot]);

   return (
      <div className={styles.activity_container}>
         <div className={styles.timers_list}>
            <div className={styles.list_header}>
               <div className={styles.header_title}>Таймеры</div>
               <div className={styles.timers_limit}>
                  {timers?.length}/{currentLimit}
               </div>
            </div>
            {timers?.map((timer, i) => (
               <TimerCard
                  key={i}
                  botId={timer.botId}
                  id={timer.id}
                  message={timer.message}
                  interval={timer.interval}
                  createdAt={timer.createdAt}
               />
            ))}
            {timers?.length === currentLimit ? (
               <></>
            ) : (
               <button
                  className={styles.create_timer_button}
                  onClick={handleCreateTimer}
                  disabled={bot?.status === 'online'}
               >
                  Создать таймер
               </button>
            )}
         </div>
      </div>
   );
};
