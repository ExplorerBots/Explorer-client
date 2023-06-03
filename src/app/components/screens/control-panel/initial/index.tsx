import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { loading, setBots } from '@/app/store/slices/bots';
import { socket } from '@/pages/control-panel/bots';
import Head from 'next/head';
import Image from 'next/image';
import { FC, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
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
   useEffect(() => {
      dispatch(loading(true));

      socket.emit('getMyBots');
      socket.on('setBots', (data) => {
         dispatch(setBots(data));
         dispatch(loading(false));
      });

      socket.on('alert', (data) => {
         toast(data.message, {
            style:
               data.type === 'green'
                  ? { background: '#152519', color: '#4dc86a' }
                  : { background: '#281616', color: '#e25353' },
         });
      });
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
                        botsSlice.data?.map((bot, i) =>
                           bot.isPremium ? (
                              <PremiumBotItem
                                 key={i}
                                 username={bot.username}
                                 botId={bot.id}
                                 server={bot.server}
                                 status={bot.status}
                                 endDate={String(bot.endDate)}
                              />
                           ) : (
                              <ClassicBotItem
                                 key={i}
                                 username={bot.username}
                                 botId={bot.id}
                                 server={bot.server}
                                 status={bot.status}
                                 endDate={String(bot.endDate)}
                              />
                           )
                        )
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
