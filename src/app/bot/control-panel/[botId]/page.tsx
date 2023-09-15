'use client';
import { BotContext } from '@/app/bot/BotProvider';
import { ConnectLoadingContext } from '@/app/bot/control-panel/[botId]/_providers/ConnectLoadingContext';
import { CurrentWinowContext } from '@/app/bot/control-panel/[botId]/_providers/CurrentWindowContext';
import { ItemsContext } from '@/app/bot/control-panel/[botId]/_providers/ItemsContext';
import { SelectedItemContext } from '@/app/bot/control-panel/[botId]/_providers/SelectedItemContext';
import { SocketContext } from '@/app/bot/control-panel/[botId]/_providers/SocketContext';
import { TimersContext } from '@/app/bot/control-panel/[botId]/_providers/TimersContext';
import { tabs } from '@/app/bot/control-panel/[botId]/data';
import HotbarContainer from '@/components/screens/bot/control-panel/[botId]/hotbar/HotbarContainer';
import MainContainer from '@/components/screens/bot/control-panel/[botId]/main/MainContainer';
import Sidebar from '@/components/screens/bot/control-panel/[botId]/sidebar/Sidebar';
import { links } from '@/constants';
import { IBotTimer, ICurrentWindow, IItem } from '@/interfaces';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Socket, io } from 'socket.io-client';
import { BotProvider } from '../../BotProvider';
import styles from './_styles.module.scss';

const BotControlPage = ({ params }: { params: any }) => {
   const { bot, setBot } = useContext(BotContext);
   const [selectedTabId, setSelectedTabId] = useState<number>(tabs[0].id);
   const [requested, setRequested] = useState<boolean>(false);

   const [items, setItems] = useState<IItem[]>([]);
   const [socket, setSocket] = useState<Socket | null>(null);
   const [currentWindow, setCurrentWindow] = useState<ICurrentWindow | null>(
      null
   );
   const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
   const [connectLoading, setConnectLoading] = useState<boolean>(false);
   const [timers, setTimers] = useState<IBotTimer[] | null>(null);
   const [enableTimers, setEnableTimers] = useState<IBotTimer[]>([]);

   const { botId } = params;

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

   useEffect(() => {
      if (!socket) return;
      if (!bot) return;

      socket.emit('get-last-messages', () => {});
      socket.emit('get-inventory-items', () => {});
      socket.emit('get-quick-bar-slot');
      socket.emit('get-info');
      socket.emit('get-current-window');
      socket.emit('get-timers');

      if (requested) return;
      setRequested(true);

      socket.on('server-connected', (data) => {
         console.log('connected');
         setBot({
            ...bot,
            status: 'online',
         });
         toast.success('Успешное подключение к серверу!');
      });

      socket.on('kicked', (data) => {
         console.log('kicked');
         setBot({
            ...bot,
            status: 'offline',
         });
         toast.warning('Бот был кикнут с сервера!');
      });

      socket.on('logout', (data) => {
         console.log('logout');
         setBot({
            ...bot,
            status: 'offline',
         });
         toast.success('Выход с сервера!');
      });

      socket.on('set-inventory-items', (items) => {
         setItems(items);
      });

      socket.on('window-open', (window) => {
         setSelectedTabId(2);
         console.log(window);
      });

      socket.on('set-current-window', (window) => {
         if (window) setSelectedTabId(2);
         setCurrentWindow(window);
      });

      socket.on('set-inventory-selected-item', (selectedItem) => {
         setSelectedItem(selectedItem);
      });

      socket.on('map-packet', (packet) => {
         console.log(packet);
      });
      socket.on('no-access', () => {
         toast.success('errror');
      });

      socket.on('set-timers', (timers: IBotTimer[]) => {
         console.log(timers);
         setEnableTimers(timers);
      });

      socket?.on('timer-enabled', (data: { id: number }) => {
         const foundedTimer = timers?.find((t) => t.id === data.id);
         console.log(foundedTimer);
         if (foundedTimer) {
            setEnableTimers([...enableTimers, foundedTimer]);
         } else {
            setEnableTimers([...enableTimers]);
         }
         toast.success(`Таймер ${data.id} запущен`);
      });

      socket?.on('timer-disabled', (tId: number) => {
         setEnableTimers([...enableTimers.filter((t) => t.id !== tId)]);
         toast.success(`Таймер ${tId} Остановлен`);
      });
   }, [socket, bot]);

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
                           <div className={styles.inner_container}>
                              <Sidebar
                                 tabs={tabs}
                                 selectedId={selectedTabId}
                                 onClick={setSelectedTabId}
                              />
                              <MainContainer selectedId={selectedTabId} />
                           </div>
                           <HotbarContainer />
                        </SelectedItemContext.Provider>
                     </ItemsContext.Provider>
                  </CurrentWinowContext.Provider>
               </ConnectLoadingContext.Provider>
            </TimersContext.Provider>
         </BotProvider>
      </SocketContext.Provider>
   );
};

export default BotControlPage;
