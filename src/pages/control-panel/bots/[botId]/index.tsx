import BotControlScreen from '@/app/components/screens/control-panel/control';
import { CurrentBotContext } from '@/app/components/screens/control-panel/control/context/CurrentBotContext';
import { ItemsContext } from '@/app/components/screens/control-panel/control/context/ItemsContext';
import { SocketContext } from '@/app/components/screens/control-panel/control/context/SocketContext';
import { links } from '@/app/constants';
import { withAuth } from '@/app/hoc/withAuth';
import { IBot, IItem } from '@/app/interfaces';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getMyBots } from '@/app/store/slices/bots';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const BotControlPage = () => {
   const [items, setItems] = useState<IItem[]>([]);
   const [socket, setSocket] = useState<Socket | null>(null);
   const [currentBot, setCurrentBot] = useState<IBot | null>(null);
   const [initComplete, setInitComplete] = useState<boolean>(false);

   const router = useRouter();
   const { botId } = router.query;
   const botsSlice = useAppSelector((state) => state.bots);
   const bot = botsSlice.data.find((bot) => bot.id === Number(botId));
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (!socket) {
         if (botId) {
            if (typeof window !== 'undefined') {
               setSocket(
                  io(links.SERVER, {
                     extraHeaders: {
                        Authorization: window.localStorage.getItem(
                           'authToken'
                        ) as string,
                        botId: String(botId),
                     },
                  })
               );
            }
         }
      }

      if (socket && !currentBot) {
         if (bot) {
            setCurrentBot(bot);
         } else {
            dispatch(getMyBots());
         }
      }
   }, [socket, botsSlice, botId]);

   return (
      <SocketContext.Provider value={{ socket, setSocket }}>
         <CurrentBotContext.Provider value={{ currentBot, setCurrentBot }}>
            <ItemsContext.Provider value={{ items, setItems }}>
               <BotControlScreen />
            </ItemsContext.Provider>
         </CurrentBotContext.Provider>
      </SocketContext.Provider>
   );
};
export default withAuth(BotControlPage);
