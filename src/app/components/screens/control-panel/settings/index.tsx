import BlockTitle from '@/app/components/ui/general/blockTitle/BlockTitle';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import InputField from './components/InputField';
import styles from './styles.module.scss';

const BotSettingsScreen = () => {
   const [username, setUsername] = useState('');
   const router = useRouter();

   return (
      <>
         <Head>
            <title>EBots - Настройка бота</title>
         </Head>

         <div className={styles.settings_container}>
            <BlockTitle text="Настройка бота" />
            <div className={styles.content}>
               <InputField
                  botId={Number(router.query.botId)}
                  value={username}
                  onChange={setUsername}
                  placeholder={''}
               />
            </div>
         </div>
      </>
   );
};

export default BotSettingsScreen;
