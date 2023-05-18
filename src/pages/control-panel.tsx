import BlockTitle from '@/app/components/ui/blockTitle/BlockTitle';
import styles from '@/app/styles/control-panel.module.scss';
import Head from 'next/head';
import Image from 'next/image';
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
               <ClassicBotItem />
               <PremiumBotItem />
               <PremiumBotItem />
               <PremiumBotItem />
               <PremiumBotItem />
               <PremiumBotItem />
               <PremiumBotItem />
            </div>
         </div>
      </>
   );
};

const ClassicBotItem = () => {
   return (
      <div className={styles.classic_bot}>
         <div className={styles.header}>
            <div className={styles.type}>Classic</div>
         </div>
         <div className={styles.center}>
            <p className={styles.username}>
               <span className={styles.description}>Бот: </span> SapokTapok
            </p>
            <p className={styles.id}>
               {' '}
               <span className={styles.description}>Id: </span>3120
            </p>
            <p className={styles.server}>
               <span className={styles.description}>Сервер: </span> HolyWorld
            </p>
            <p className={styles.activity}>
               <span className={styles.description}>Активность: </span>
               <span className={styles.green}>online</span>
            </p>
         </div>
         <div className={styles.bottom}>
            <button className={styles.button_start}>Управление</button>
            <p className={styles.days_left}>Осталось дней: 30</p>
         </div>
      </div>
   );
};

const PremiumBotItem = () => {
   return (
      <div className={styles.premium_bot}>
         <div className={styles.premium_crown}>
            <Image src="/images/crown.png" alt="" width={80} height={50} />
         </div>
         <div className={styles.header}>
            <div className={styles.type}>Premium</div>
         </div>
         <div className={styles.center}>
            <p className={styles.username}>
               <span className={styles.description}>Бот: </span> SapokTapok
            </p>
            <p className={styles.id}>
               {' '}
               <span className={styles.description}>Id: </span>3120
            </p>
            <p className={styles.server}>
               <span className={styles.description}>Сервер: </span> HolyWorld
            </p>
            <p className={styles.activity}>
               <span className={styles.description}>Активность: </span>
               <span className={styles.green}>online</span>
            </p>
         </div>
         <div className={styles.bottom}>
            <button className={styles.button_start}>Управление</button>
            <p className={styles.days_left}>Осталось дней: 30</p>
         </div>
      </div>
   );
};

export default ControlPanelPage;
