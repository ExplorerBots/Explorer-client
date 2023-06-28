import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
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
   const botsSlice = useAppSelector((store) => store.bots);
   const chatInputRef = useRef<HTMLInputElement>(null);
   const router = useRouter();
   const dispatch = useAppDispatch();

   const { setCurrentBot } = useContext(CurrentBotContext);
   const { socket } = useContext(SocketContext);
   const { currentBot } = useContext(CurrentBotContext);
   const { setItems } = useContext(ItemsContext);
   const { currentWindow, setCurrentWindow } = useContext(CurrentWinowContext);
   const { setSelectedItem } = useContext(SelectedItemContext);

   const { botId } = router.query;
   const bot = botsSlice.data.find((bot) => bot.id === Number(botId));
   const [selectedTabId, setSelectedTabId] = useState<number>(tabs[0].id);
   const [requested, setRequested] = useState<boolean>(false);

   useEffect(() => {
      if (!socket) return;
      if (!currentBot) return;

      socket.emit('get-last-messages', () => {});
      socket.emit('get-inventory-items', () => {});
      socket.emit('get-quick-bar-slot');
      socket.emit('get-info');
      socket.emit('get-current-window');

      if (requested) return;
      setRequested(true);

      socket.on('server-connected', (data) => {
         console.log('connected');
         setCurrentBot({
            ...currentBot,
            status: 'online',
         });
         toast.success('Успешное подключение к серверу!');
      });

      socket.on('kicked', (data) => {
         console.log('kicked');
         setCurrentBot({
            ...currentBot,
            status: 'offline',
         });
         toast.warning('Бот был кикнут с сервера!');
      });

      socket.on('logout', (data) => {
         console.log('logout');
         setCurrentBot({
            ...currentBot,
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
   }, [socket, currentBot]);

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
