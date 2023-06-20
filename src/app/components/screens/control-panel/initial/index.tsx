import DefaultModal from '@/app/components/ui/modals/defaultModal/DefaultModal';
import { botPrice } from '@/app/constants';
import { IBot } from '@/app/interfaces';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getMyBots } from '@/app/store/slices/bots';
import Head from 'next/head';
import Image from 'next/image';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import BotCard from './components/BotCard';
import styles from './styles.module.scss';

const ControlPanelInitalScreen: FC = () => {
   const ref = useRef<HTMLDivElement>(null);
   const botsSlice = useAppSelector((state) => state.bots);
   const dispatch = useAppDispatch();

   const [currentExpiredBot, setCurrentExpiredBot] = useState<IBot | null>(
      null
   );
   const [currentExpiredPeriod, setCurrentExpiredPeriod] = useState<number>(5);
   const [currentExpiredTotalPrice, setCurrentExpiredTotalPrice] =
      useState<number>(0);

   const OnSubmitExpiredModal = () => {};
   const OnCloseExpiredModal = () => {
      setCurrentExpiredBot(null);
   };

   useEffect(() => {
      if (currentExpiredBot?.isPremium) {
         setCurrentExpiredTotalPrice(
            currentExpiredPeriod * botPrice.PREMIUM_BOT_PRICE_PER_DAY
         );
      } else {
         setCurrentExpiredTotalPrice(
            currentExpiredPeriod * botPrice.CLASSIC_BOT_PRICE_PER_DAY
         );
      }
   }, [currentExpiredPeriod, currentExpiredBot?.isPremium]);

   useEffect(() => {
      wheelControl(ref);
      dispatch(getMyBots());
   }, []);

   return (
      <>
         <Head>
            <title>EBots - Панель управления</title>
         </Head>

         <div className={styles.bots_container}>
            <div className={styles.content} ref={ref}>
               {botsSlice.isLoading ? (
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
                     {botsSlice.data.length ? (
                        botsSlice.data?.map((bot, i) => (
                           <BotCard
                              key={i}
                              setCurrentExpired={setCurrentExpiredBot}
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
                              У тебя нету ни одного бота, пора бы тебе его
                              купить :3
                           </p>
                        </div>
                     )}
                  </>
               )}
            </div>
         </div>
         <DefaultModal
            title="Продление бота"
            active={!!currentExpiredBot}
            onSubmit={OnSubmitExpiredModal}
            onClose={OnCloseExpiredModal}
         >
            <div className={styles.modal_body}>
               <div className={styles.modal_bot_info}>
                  <div className={styles.id}>Айди: {currentExpiredBot?.id}</div>
                  <div className={styles.username}>
                     Ник: {currentExpiredBot?.username}
                  </div>
                  <div className={styles.type}>
                     Тип: {currentExpiredBot?.isPremium ? 'Premium' : 'Classic'}
                  </div>
                  <div className={styles.server}>
                     Сервер: {currentExpiredBot?.server}
                  </div>
               </div>

               <div className={styles.modal_period}>
                  <input
                     min={5}
                     max={30}
                     step={5}
                     type="range"
                     className={styles.input_range}
                     value={currentExpiredPeriod || ''}
                     onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setCurrentExpiredPeriod(Number(e.target.value))
                     }
                  />
               </div>

               <div className={styles.modal_results}>
                  <p>Итого: {currentExpiredTotalPrice} ₽</p>
                  <p>Срок: {currentExpiredPeriod} дней</p>
               </div>
            </div>
         </DefaultModal>
      </>
   );
};

const wheelControl = (ref: any) => {
   const el = ref.current;
   if (el) {
      const onWheel = (e: any) => {
         e.preventDefault();
         el.scrollTo({
            left: el.scrollLeft + e.deltaY,
         });
      };

      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
   }
};

export default ControlPanelInitalScreen;
