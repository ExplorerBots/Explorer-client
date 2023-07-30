import BotSettingsScreen from '@/app/components/screens/control-panel/settings';
import { BotProvider } from '@/app/context/BotContext';
import { withAuth } from '@/app/hoc/withAuth';
import Head from 'next/head';
import { useRouter } from 'next/router';

const BotSettingsPage = () => {
   const router = useRouter();

   return (
      <BotProvider botId={Number(router.query.botId)}>
         <Head>
            <title>EBots - Настройка бота</title>
         </Head>
         <BotSettingsScreen />
      </BotProvider>
   );
};
export default withAuth(BotSettingsPage);
