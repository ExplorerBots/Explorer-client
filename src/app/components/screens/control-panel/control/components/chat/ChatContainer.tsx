import Preloader from '@/app/components/ui/general/preloader/Preloader';
import { IChatNotify, IMessage } from '@/app/interfaces';
import { useContext, useEffect, useState } from 'react';
import { CurrentBotContext } from '../../context/CurrentBotContext';
import { SocketContext } from '../../context/SocketContext';
import styles from '../../styles.module.scss';
import Chat from './Chat';
import Footer from './Footer';
import Header from './Header';

const ChatContainer = () => {
   const [dictionary, setDictionary] = useState<(IMessage | IChatNotify)[]>([]);

   const { currentBot } = useContext(CurrentBotContext);
   const { socket } = useContext(SocketContext);

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

   return (
      <div className={styles.chat_container}>
         {!currentBot && (
            <div className={styles.chat_container_loading}>
               <Preloader width={100} height={100} />
            </div>
         )}
         <>
            <Header />
            <Chat dictionary={dictionary} />
            <Footer />
         </>
      </div>
   );
};

export default ChatContainer;
