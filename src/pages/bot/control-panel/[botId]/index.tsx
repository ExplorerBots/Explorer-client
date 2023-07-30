import BotControlScreen from '@/app/components/screens/control-panel/control';
import { TimersContext } from '@/app/components/screens/control-panel/control/components/addons/timers/context/TimersContext';
import { ConnectLoadingContext } from '@/app/components/screens/control-panel/control/context/ConnectLoadingContext';
import { CurrentWinowContext } from '@/app/components/screens/control-panel/control/context/CurrentWindowContext';
import { ItemsContext } from '@/app/components/screens/control-panel/control/context/ItemsContext';
import { SelectedItemContext } from '@/app/components/screens/control-panel/control/context/SelectedItemContext';
import { SocketContext } from '@/app/components/screens/control-panel/control/context/SocketContext';
import { links } from '@/app/constants';
import { BotContext, BotProvider } from '@/app/context/BotContext';
import { withAuth } from '@/app/hoc/withAuth';
import { IBot, IBotTimer, ICurrentWindow, IItem } from '@/app/interfaces';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';

const BotControlPage = () => {
   const [items, setItems] = useState<IItem[]>([]);
   const [socket, setSocket] = useState<Socket | null>(null);
   const [currentBot, setCurrentBot] = useState<IBot | null>(null);
   const [currentWindow, setCurrentWindow] = useState<ICurrentWindow | null>(
      null
   );
   const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
   const [connectLoading, setConnectLoading] = useState<boolean>(false);
   const [initComplete, setInitComplete] = useState<boolean>(false);
   const [timers, setTimers] = useState<IBotTimer[] | null>(null);
   const [enableTimers, setEnableTimers] = useState<IBotTimer[]>([]);

   const router = useRouter();
   const { botId } = router.query;

   const { bot } = useContext(BotContext);

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
      if (socket) {
         socket.on('no-access', () => {
            toast.error('Нет доступа');
         });
      }
   }, [socket, botId]);

   return (
      <SocketContext.Provider value={{ socket, setSocket }}>
         <BotProvider botId={Number(botId)}>
            <TimersContext.Provider
               value={{ timers, setTimers, enableTimers, setEnableTimers }}
            >
               <ConnectLoadingContext.Provider
                  value={{ connectLoading, setConnectLoading }}
               >
                  <CurrentWinowContext.Provider
                     value={{ currentWindow, setCurrentWindow }}
                  >
                     <ItemsContext.Provider value={{ items, setItems }}>
                        <SelectedItemContext.Provider
                           value={{ selectedItem, setSelectedItem }}
                        >
                           <BotControlScreen />
                        </SelectedItemContext.Provider>
                     </ItemsContext.Provider>
                  </CurrentWinowContext.Provider>
               </ConnectLoadingContext.Provider>
            </TimersContext.Provider>
         </BotProvider>
      </SocketContext.Provider>
   );
};
export default withAuth(BotControlPage);
