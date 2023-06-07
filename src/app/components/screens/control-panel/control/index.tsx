import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef } from 'react';
import ChatContainer from './components/chat/ChatContainer';
import { CurrentBotContext } from './context/CurrentBotContext';
import { SocketContext } from './context/SocketContext';

const BotControlScreen = () => {
   const botsSlice = useAppSelector((store) => store.bots);
   const chatInputRef = useRef<HTMLInputElement>(null);
   const { setCurrentBot } = useContext(CurrentBotContext);
   const router = useRouter();
   const dispatch = useAppDispatch();

   const { botId } = router.query;
   const bot = botsSlice.data.find((bot) => bot.id === Number(botId));
   const { socket } = useContext(SocketContext);
   const { currentBot } = useContext(CurrentBotContext);

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

   return <ChatContainer />;
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
