import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import Head from 'next/head';
import { FC, useEffect, useRef } from 'react';
import ClassicBotItem from './components/ClassicBotItem';
import PremiumBotItem from './components/PremiumBotItem';
import styles from './styles.module.scss';

const ControlPanelInitalScreen: FC = () => {
   const ref = useRef<HTMLDivElement>(null);
   const botsSlice = useAppSelector((state) => state.bots);
   const dispatch = useAppDispatch();

   useEffect(() => {
      wheelControl(ref);
   }, []);

   return (
      <>
         <Head>
            <title>EBots - Панель управления</title>
         </Head>

         <div className={styles.bots_container}>
            <div className={styles.content} ref={ref}>
               {botsSlice.data ? (
                  botsSlice.data?.map((bot, i) =>
                     bot.isPremium ? (
                        <PremiumBotItem
                           key={i}
                           username={bot.username}
                           botId={bot.botId}
                           server={bot.server}
                           status={bot.status}
                           endDate={bot.endDate}
                        />
                     ) : (
                        <ClassicBotItem
                           key={i}
                           username={bot.username}
                           botId={bot.botId}
                           server={bot.server}
                           status={bot.status}
                           endDate={bot.endDate}
                        />
                     )
                  )
               ) : (
                  <div className={styles.bots_null}>
                     <p className={styles.text}>
                        У тебя нету ни одного бота, пора бы тебе его купить :3
                     </p>
                  </div>
               )}
            </div>
         </div>
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
