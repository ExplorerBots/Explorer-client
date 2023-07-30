import { BotContext } from '@/app/context/BotContext';
import { IBotTimer } from '@/app/interfaces';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TimersContext } from './components/addons/timers/context/TimersContext';
import HotbarContainer from './components/hotbar/HotbarContainer';
import MainContainer from './components/main/MainContainer';
import Sidebar from './components/sidebar/Sidebar';
import { CurrentBotContext } from './context/CurrentBotContext';
import { CurrentWinowContext } from './context/CurrentWindowContext';
import { ItemsContext } from './context/ItemsContext';
import { SelectedItemContext } from './context/SelectedItemContext';
import { SocketContext } from './context/SocketContext';
import { tabs } from './data';
import styles from './styles.module.scss';

const BotControlScreen = () => {
   const router = useRouter();

   const { setCurrentBot } = useContext(CurrentBotContext);
   const { socket } = useContext(SocketContext);
   const { setItems } = useContext(ItemsContext);
   const { currentWindow, setCurrentWindow } = useContext(CurrentWinowContext);
   const { setSelectedItem } = useContext(SelectedItemContext);
   const { setEnableTimers, enableTimers, timers } = useContext(TimersContext);

   const { botId } = router.query;
   const { bot, setBot } = useContext(BotContext);
   const [selectedTabId, setSelectedTabId] = useState<number>(tabs[0].id);
   const [requested, setRequested] = useState<boolean>(false);

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
      <>
         <div className={styles.inner_container}>
            <Sidebar
               tabs={tabs}
               selectedId={selectedTabId}
               onClick={setSelectedTabId}
            />
            <MainContainer selectedId={selectedTabId} />
         </div>
         <HotbarContainer />
      </>
   );
};

export default BotControlScreen;
