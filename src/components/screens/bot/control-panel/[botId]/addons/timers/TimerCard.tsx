import { BotContext } from '@/app/bot/BotProvider';
import { SocketContext } from '@/app/bot/control-panel/[botId]/_providers/SocketContext';
import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import { useDeleteTimer } from '@/hooks/bot/control-panel/timers/useDeleteTimer';
import { useUpdateTimer } from '@/hooks/bot/control-panel/timers/useUpdateTimer';
import { IBotTimer } from '@/interfaces';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TimersContext } from '../../../../../../../app/bot/control-panel/[botId]/_providers/TimersContext';

export const TimerCard = ({
   id,
   botId,
   message,
   interval,
   createdAt,
}: {
   id: number;
   botId: number;
   message: string;
   interval: number;
   createdAt: string;
}) => {
   const { timers, setTimers, enableTimers, setEnableTimers } =
      useContext(TimersContext);
   const { bot } = useContext(BotContext);
   const { socket } = useContext(SocketContext);

   const { mutateAsync: updateTimer, isLoading, error } = useUpdateTimer();
   const {
      mutateAsync: deleteTimer,
      isLoading: deleteTimerLoading,
      error: deleteTimerError,
   } = useDeleteTimer();
   const [inputInterval, setInputInterval] = useState<number>(interval);
   const [inputMessage, setInputMessage] = useState<string>(message);

   const [showInterval, setShowInterval] = useState<boolean>(false);
   const [showMessage, setShowMessage] = useState<boolean>(false);

   const [isEnabled, setIsEnabled] = useState<IBotTimer | undefined>(undefined);

   const handleUpdateTimer = async () => {
      if (bot?.status === 'online') {
         toast.warn('Бот онлайн, выключите бота перед сохранением таймера');
         return;
      }

      const response = await updateTimer({
         id,
         dto: { interval: inputInterval, message: inputMessage },
      });

      if (!response) return;

      setShowInterval(false);
      setShowMessage(false);
   };

   const handleDeleteTimer = async () => {
      const response: any = await deleteTimer(id);

      if (!response) return;
      console.log(response);
      const filteredTimers = timers!.filter((t) => t.id !== response.id);
      setTimers(filteredTimers);
   };

   const handleEnableTimer = () => {
      socket!.emit('enable-timer', { id });
      socket?.once('timer-enabled', (data: { id: number }) => {
         const foundedTimer = timers?.find((t) => t.id === data.id);
         if (foundedTimer) {
            setEnableTimers([...enableTimers, foundedTimer]);
         } else {
            setEnableTimers([...enableTimers]);
         }
         toast.success(`Таймер ${id} запущен`);
      });
   };

   const handleDisableTimer = () => {
      socket!.emit('disable-timer', { id });
      socket?.once('timer-disabled', (tId: number) => {
         setEnableTimers([...enableTimers.filter((t) => t.id !== tId)]);
         toast.success(`Таймер ${id} Остановлен`);
      });
   };

   useEffect(() => {
      setIsEnabled(enableTimers.find((t) => t.id === id));
   }, [enableTimers]);

   return (
      <div className={styles.timer_card}>
         <div className={styles.layer}>
            <div className={styles.id}>
               <div className={styles.card_description}>id:</div>
               <div className={styles.card_id}> {id}</div>
            </div>
            <button
               className={styles.card_delete_button}
               onClick={handleDeleteTimer}
               disabled={deleteTimerLoading}
            >
               x
            </button>
         </div>
         <div className={styles.layer}>
            <div className={styles.field}>
               {/* <span className={styles.field_description}>Сообщение:</span> */}
               <input
                  type="text"
                  placeholder="/fix all"
                  value={inputMessage}
                  onKeyDown={(e) => e.key === 'Enter' && handleUpdateTimer()}
                  onChange={(e) => {
                     setInputMessage(e.target.value);
                     setShowMessage(true);
                  }}
               />
               {isLoading ? (
                  <button className={styles.confirm_button}>
                     <Image
                        src="/svg/preloader.svg"
                        width={10}
                        height={10}
                        alt=""
                     />
                  </button>
               ) : (
                  <>
                     {showMessage && (
                        <button
                           className={styles.confirm_button}
                           onClick={handleUpdateTimer}
                        >
                           Сохр.
                        </button>
                     )}
                  </>
               )}
            </div>
            <div className={styles.field}>
               {/* <span className={styles.field_description}>Интервал:</span> */}
               <input
                  type="number"
                  placeholder="секунды"
                  value={inputInterval === 0 ? '' : inputInterval}
                  onKeyDown={(e) => e.key === 'Enter' && handleUpdateTimer()}
                  onChange={(e) => {
                     setInputInterval(Number(e.target.value));
                     setShowInterval(true);
                  }}
               />
               {isLoading ? (
                  <button className={styles.confirm_button}>
                     <Image
                        src="/svg/preloader.svg"
                        width={10}
                        height={10}
                        alt=""
                     />
                  </button>
               ) : (
                  <>
                     {showInterval && (
                        <button
                           className={styles.confirm_button}
                           onClick={handleUpdateTimer}
                        >
                           Сохр.
                        </button>
                     )}
                  </>
               )}
            </div>

            <button
               className={styles.card_button}
               disabled={bot?.status !== 'online'}
               data-color={!isEnabled ? 'green' : 'red'}
               onClick={() =>
                  isEnabled ? handleDisableTimer() : handleEnableTimer()
               }
            >
               {isEnabled ? 'Стоп' : 'Старт'}
            </button>
         </div>
      </div>
   );
};
