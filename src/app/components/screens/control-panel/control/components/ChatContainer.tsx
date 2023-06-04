import { IChatNotify, IMessage } from '@/app/interfaces';
import { useAppDispatch } from '@/app/store/hooks';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { CurrentBotContext } from '../context/CurrentBotContext';
import { SocketContext } from '../context/SocketContext';
import styles from '../styles.module.scss';
import Chat from './Chat';

const ChatContainer = () => {
   const [dictionary, setDictionary] = useState<(IMessage | IChatNotify)[]>([]);
   const [chatText, setChatText] = useState('');

   // const botsSlice = useAppSelector((state) => state.bots);
   const { currentBot } = useContext(CurrentBotContext);
   const { socket } = useContext(SocketContext);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (socket) {
         socket.on('chat-message', (data) => {
            setDictionary((prev) => [
               ...prev,
               {
                  type: 'message',
                  timestamp: new Date(data.timestamp).toLocaleTimeString(),
                  text: data.message,
               },
            ]);
         });
      }
   }, [socket]);

   const newMessage = () => {
      if (socket) {
         if (chatText === '') return;
         // setDictionary((prev) => [
         //    ...prev,
         //    {
         //       type: 'message',
         //       timestamp: new Date().toLocaleTimeString(),
         //       text: chatText,
         //    },
         // ]);

         socket.emit('chat-message', { message: chatText });

         setChatText('');
      }
   };

   const ConnectButtonHandler = () => {
      if (socket) {
         socket.emit('connect-to-server', {
            botId: currentBot?.id,
         });
      }
   };
   const DisconnectButtonHandler = () => {
      if (socket) {
         socket.emit('logout', {
            botId: currentBot?.id,
         });
      }
   };

   return (
      <div className={styles.chat_container}>
         <div className={styles.header}>
            <div className={styles.avatar}></div>
            <div className={styles.left_side}>
               <p className={styles.username}>
                  {currentBot?.username}{' '}
                  <span className={styles.bot_id}>{currentBot?.id}</span>
               </p>
               <p className={styles.server}>{currentBot?.server}</p>
            </div>
            <div className={styles.right_side}>
               {currentBot?.status !== 'online' ? (
                  <></>
               ) : (
                  <button
                     className={styles.button_leave}
                     onClick={DisconnectButtonHandler}
                  >
                     Отключить
                  </button>
               )}
            </div>
         </div>
         <Chat dictionary={dictionary} />
         <div className={styles.footer}>
            {currentBot?.status !== 'online' ? (
               <button
                  className={styles.connect_button}
                  onClick={ConnectButtonHandler}
               >
                  Подключиться
               </button>
            ) : (
               <>
                  <input
                     className={styles.text_input}
                     contentEditable={true}
                     placeholder="/god"
                     value={chatText}
                     onChange={(e) => {
                        setChatText(e.currentTarget.value);
                     }}
                     onSubmit={newMessage}
                     onKeyDown={(e) => e.code === 'Enter' && newMessage()}
                  />
                  <button
                     type="submit"
                     className={styles.chat_send}
                     onClick={newMessage}
                  >
                     <Image src="/svg/send.svg" alt="" width={30} height={30} />
                  </button>
               </>
            )}
         </div>
      </div>
   );
};

export default ChatContainer;
