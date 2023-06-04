import BotControlScreen from '@/app/components/screens/control-panel/control';
import { CurrentBotContext } from '@/app/components/screens/control-panel/control/context/CurrentBotContext';
import { SocketContext } from '@/app/components/screens/control-panel/control/context/SocketContext';
import { withAuth } from '@/app/hoc/withAuth';
import { IBot } from '@/app/interfaces';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const BotControlPage = () => {
   const [socket, setSocket] = useState<Socket | null>(null);
   const [currentBot, setCurrentBot] = useState<IBot | null>(null);

   const router = useRouter();
   const { botId } = router.query;

   useEffect(() => {
      setSocket(
         io('http://26.67.250.2:7070', {
            extraHeaders: {
               Authorization:
                  typeof window !== 'undefined'
                     ? (window.localStorage.getItem('authToken') as string)
                     : '',
            },
         })
      );
   }, []);
   return (
      <SocketContext.Provider value={{ socket, setSocket }}>
         <CurrentBotContext.Provider value={{ currentBot, setCurrentBot }}>
            <BotControlScreen />
         </CurrentBotContext.Provider>
      </SocketContext.Provider>
   );
};
export default withAuth(BotControlPage);
