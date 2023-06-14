import { IControlSideBarItem } from '@/app/interfaces';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import ChatContainer from './components/chat/ChatContainer';
import MainContainer from './components/main/MainContainer';
import Sidebar from './components/sidebar/Sidebar';
import { CurrentBotContext } from './context/CurrentBotContext';
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
         divider: true,
         id: 2,
         src: '/controlSidebar/mouse-pointer.svg',
         text: 'Автокликер',
      },
      { id: 3, src: '/controlSidebar/droplet.svg', text: 'Авто-еда' },
      { id: 4, src: '/controlSidebar/book.svg', text: 'Чаровник' },
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
   const [selectedTabId, setSelectedTabId] = useState<number>(tabs[0].id);

   useEffect(() => {
      if (socket) {
         if (currentBot) {
            socket.on('server-connected', (data) => {
               setCurrentBot({
                  ...currentBot,
                  status: 'online',
               });
            });

            socket.on('kicked', (data) => {
               setCurrentBot({
                  ...currentBot,
                  status: 'offline',
               });
            });
            socket.on('logout', (data) => {
               setCurrentBot({
                  ...currentBot,
                  status: 'offline',
               });
            });
         }
      }
   }, [socket, currentBot]);

   return (
      <div className={styles.inner_container}>
         <Sidebar
            tabs={tabs}
            selectedId={selectedTabId}
            onClick={setSelectedTabId}
         />
         <MainContainer />
         <ChatContainer />;
      </div>
   );
};

export default BotControlScreen;

// {/* <div className={styles.control_container}>
//    <div className={styles.info}>
//       <div className={styles.health}>
//          <Image
//             src="/assets/heart.png"
//             height={20}
//             width={20}
//             alt=""
//          />
//          <Image
//             src="/assets/heart.png"
//             height={20}
//             width={20}
//             alt=""
//          />
//          <Image
//             src="/assets/heart.png"
//             height={20}
//             width={20}
//             alt=""
//          />
//          <Image
//             src="/assets/heart.png"
//             height={20}
//             width={20}
//             alt=""
//          />
//          <Image
//             src="/assets/heart.png"
//             height={20}
//             width={20}
//             alt=""
//          />
//          <Image
//             src="/assets/heart.png"
//             height={20}
//             width={20}
//             alt=""
//          />
//          <Image
//             src="/assets/heart.png"
//             height={20}
//             width={20}
//             alt=""
//          />
//          <Image
//             src="/assets/heart.png"
//             height={20}
//             width={20}
//             alt=""
//          />
//          <Image
//             src="/assets/heart.png"
//             height={20}
//             width={20}
//             alt=""
//          />
//          <Image
//             src="/assets/heart.png"
//             height={20}
//             width={20}
//             alt=""
//          />
//       </div>
//       <div className={styles.feed}>
//          <Image src="/assets/feed.png" height={20} width={20} alt="" />
//          <Image src="/assets/feed.png" height={20} width={20} alt="" />
//          <Image src="/assets/feed.png" height={20} width={20} alt="" />
//          <Image src="/assets/feed.png" height={20} width={20} alt="" />
//          <Image src="/assets/feed.png" height={20} width={20} alt="" />
//          <Image src="/assets/feed.png" height={20} width={20} alt="" />
//          <Image src="/assets/feed.png" height={20} width={20} alt="" />
//          <Image src="/assets/feed.png" height={20} width={20} alt="" />
//          <Image src="/assets/feed.png" height={20} width={20} alt="" />
//          <Image src="/assets/feed.png" height={20} width={20} alt="" />
//       </div>
//    </div>
//    <div className={styles.hotbar}>
//       <HotBarSlots
//          slot={1}
//          classSlot={styles.slot}
//          classSlotImage={styles.slot_image}
//          classSlots={styles.slots}
//       />
//    </div>
// </div> */}
