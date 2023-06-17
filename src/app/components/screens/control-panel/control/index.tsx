import { IControlSideBarItem } from '@/app/interfaces';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import HotbarContainer from './components/hotbar/HotbarContainer';
import MainContainer from './components/main/MainContainer';
import Sidebar from './components/sidebar/Sidebar';
import { CurrentBotContext } from './context/CurrentBotContext';
import { ItemsContext } from './context/ItemsContext';
import { SocketContext } from './context/SocketContext';
import styles from './styles.module.scss';

const BotControlScreen = () => {
   const tabs: IControlSideBarItem[] = [
      {
         divider: true,
         id: 1,
         src: '/controlSidebar/message-circle.svg',
         text: 'Чат',
      },
      {
         id: 2,
         src: '/controlSidebar/package.svg',
         text: 'Инвентарь',
      },
      {
         divider: true,
         id: 3,
         src: '/controlSidebar/mouse-pointer.svg',
         text: 'Автокликер',
      },
      { id: 4, src: '/controlSidebar/droplet.svg', text: 'Авто-еда' },
      { id: 5, src: '/controlSidebar/book.svg', text: 'Чаровник' },
   ];

   const botsSlice = useAppSelector((store) => store.bots);
   const chatInputRef = useRef<HTMLInputElement>(null);
   const { setCurrentBot } = useContext(CurrentBotContext);
   const router = useRouter();
   const dispatch = useAppDispatch();

   const { botId } = router.query;
   const bot = botsSlice.data.find((bot) => bot.id === Number(botId));
   const { socket } = useContext(SocketContext);
   const { currentBot } = useContext(CurrentBotContext);
   const { setItems } = useContext(ItemsContext);
   const [selectedTabId, setSelectedTabId] = useState<number>(tabs[0].id);
   // const []
   const [requested, setRequested] = useState<boolean>(false);

   useEffect(() => {
      if (!socket) return;
      if (!currentBot) return;

      socket.emit('get-last-messages', () => {});
      socket.emit('get-items', () => {});
      socket.emit('get-quick-bar-slot');
      socket.emit('get-info');

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

      socket.on('set-items', (items) => {
         setItems(items);
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
