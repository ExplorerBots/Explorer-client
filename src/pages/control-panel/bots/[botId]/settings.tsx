import BlockTitle from '@/app/components/ui/general/blockTitle/BlockTitle';
import styles from '@/app/styles/control-bot-settings.module.scss';
import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';

const ControlBotSettingsPage = () => {
   return (
      <>
         <Head>
            <title>EBots - Настройка бота</title>
         </Head>

         <div className={styles.settings_container}>
            <BlockTitle text="Настройка бота" />
            <div className={styles.content}>
               <Divider text="Никнейм" />
               <input type="text" />
            </div>
         </div>
      </>
   );
};

const Divider: FC<PropsWithChildren<{ text: string; className?: string }>> = ({
   text,
   className,
}) => {
   return (
      <div className={styles.divider}>
         <div className={className ? className : styles.divider_text}>
            {text}
         </div>
      </div>
   );
};
export default ControlBotSettingsPage;
