import BlockTitle from '@/app/components/ui/blockTitle/BlockTitle';
import ClassicBotItem from '@/app/components/ui/control-panel/ClassicBotItem/ClassicBotItem';
import PremiumBotItem from '@/app/components/ui/control-panel/PremiumBotItem/PremiumBotItem';
import styles from '@/app/styles/control-panel.module.scss';
import Head from 'next/head';
import { FC, useEffect, useRef } from 'react';

const ControlPanelPage: FC = () => {
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const el = ref.current;
      if (el) {
         const onWheel = (e: any) => {
            e.preventDefault();
            el.scrollTo({
               left: el.scrollLeft + e.deltaY * 4,
               behavior: 'smooth',
            });
         };

         el.addEventListener('wheel', onWheel);
         return () => el.removeEventListener('wheel', onWheel);
      }
   }, []);

   return (
      <>
         <Head>
            <title>EBots - Панель управления</title>
         </Head>

         <div className={styles.bots_container}>
            <BlockTitle text="Список ботов" />
            <div className={styles.content} ref={ref}>
               <ClassicBotItem
                  username="SapokTapok"
                  botId={345}
                  server="HolyWorld"
                  status="online"
                  days_left={24}
               />
               <PremiumBotItem
                  username="Penis"
                  botId={222}
                  server="HolyWorld"
                  status="offline"
                  days_left={24}
               />
            </div>
         </div>
      </>
   );
};

export default ControlPanelPage;
