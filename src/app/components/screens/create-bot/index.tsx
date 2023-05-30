import BlockTitle from '@/app/components/ui/general/blockTitle/BlockTitle';
import { useAppSelector } from '@/app/store/hooks';
import Head from 'next/head';
import { FC, useState } from 'react';
import CentralLeftBlock from './components/CentralLeftBlock';
import CentralMiddleBlock from './components/CentralMiddleBlock';
import CentralRightBlock from './components/CentralRightBlock';
import InfoBlock from './components/InfoBlock';
import styles from './styles.module.scss';

const CreateBotScreen: FC = () => {
   const userSlice = useAppSelector((store) => store.user);
   const [promoState, setPromoState] = useState({
      promo: '',
      isLoading: false,
      isError: false,
      errorMessage: '',
   });

   return (
      <>
         <Head>
            <title>EBots - Создать бота</title>
         </Head>

         <div className={styles.info_container}>
            <BlockTitle text="Важная информация" />

            <div className={styles.content}>
               <InfoBlock description="Твоя ферма стоит без дела? Или ты не хочешь делать грязную работу? Купи бота, и все твои проблемы решаться!" />
               <InfoBlock description="Создав своего бота, ты получишь необычайную власть!\" />
            </div>
         </div>

         <div className={styles.create_container}>
            <div className={styles.content}>
               <CentralLeftBlock />
               <CentralMiddleBlock />
               <CentralRightBlock />
            </div>
         </div>
      </>
   );
};
export default CreateBotScreen;
