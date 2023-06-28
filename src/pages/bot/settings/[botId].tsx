import BotSettingsScreen from '@/app/components/screens/control-panel/settings';
import { withAuth } from '@/app/hoc/withAuth';
import { IBot } from '@/app/interfaces';
import { botsService } from '@/app/services/bots.service';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { Head } from 'next/document';

const BotSettingsPage = () => {
   const router = useRouter();
   const [currentBot, setCurrentBot] = useState<IBot | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      if (!router.query.botId) return;

      botsService
         .getOne(Number(router.query.botId))
         .then((bot) => {
            if (!bot) return;
            setCurrentBot(bot);
         })
         .finally(() => setLoading(false));
      setLoading(true);
   }, [router.query.botId]);

   return (
      <>
         <Head>
            <title>EBots - Настройка бота</title>
         </Head>
         <BotSettingsScreen
            loading={loading}
            currentBot={currentBot}
            setCurrentBot={setCurrentBot}
         />
         ;
      </>
   );
};
export default withAuth(BotSettingsPage);
