import Image from 'next/image';
import { FC, PropsWithChildren, useContext, useState } from 'react';
import { CurrentBotContext } from '../../context/CurrentBotContext';
import { SocketContext } from '../../context/SocketContext';
import styles from '../../styles.module.scss';

interface Props {
   selectedId: number;
}

const Footer: FC<PropsWithChildren<Props>> = ({ selectedId }) => {
   const { socket } = useContext(SocketContext);
   const { currentBot } = useContext(CurrentBotContext);
   const [chatText, setChatText] = useState('');
   const [connectButtonLoaderActive, setConnectButtonLoaderActive] =
      useState<boolean>(false);

   const ConnectButtonHandler = () => {
      if (socket) {
         socket.emit('connect-to-server', {
            botId: currentBot?.id,
         });
         setConnectButtonLoaderActive(true);
         socket.on('server-connected', () => {
            setConnectButtonLoaderActive(false);
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

   const newMessage = () => {
      if (socket) {
         if (chatText === '') return;
         socket.emit('chat-message', { message: chatText });
         setChatText('');
      }
   };

   return (
      <>
         {selectedId === 1 ? (
            <div className={styles.footer}>
               {currentBot?.status !== 'online' ? (
                  <>
                     {connectButtonLoaderActive ? (
                        <button className={styles.connect_button_loader}>
                           <Image
                              src="/svg/preloader.svg"
                              width={25}
                              height={25}
                              alt=""
                           />
                        </button>
                     ) : (
                        <button
                           className={styles.connect_button}
                           onClick={ConnectButtonHandler}
                        >
                           Подключиться
                        </button>
                     )}
                  </>
               ) : (
                  <>
                     <input
                        className={styles.text_input}
                        contentEditable={true}
                        placeholder="/help"
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
                        <Image
                           src="/svg/send.svg"
                           alt=""
                           width={30}
                           height={30}
                        />
                     </button>
                  </>
               )}
            </div>
         ) : (
            <></>
         )}
      </>
   );
};

export default Footer;
