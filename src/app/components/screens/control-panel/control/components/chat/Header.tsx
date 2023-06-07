import { routes } from '@/app/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CurrentBotContext } from '../../context/CurrentBotContext';
import { SocketContext } from '../../context/SocketContext';
import styles from '../../styles.module.scss';

const Header = () => {
   const { socket } = useContext(SocketContext);
   const { currentBot } = useContext(CurrentBotContext);
   const router = useRouter();

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
      <div className={styles.header}>
         <div className={styles.avatar}></div>
         <div className={styles.left_side}>
            <p className={styles.username}>
               {currentBot?.username}{' '}
               <span className={styles.bot_id}>{currentBot?.id}</span>
               {currentBot?.status === 'online' ? (
                  <span className={styles.green}>{currentBot?.status}</span>
               ) : (
                  <span className={styles.red}>{currentBot?.status}</span>
               )}
            </p>
            <p className={styles.server}>{currentBot?.server}</p>
         </div>
         <div className={styles.right_side}>
            <button
               className={styles.button_leave}
               onClick={() => router.push(routes.SETTINGS + currentBot?.id)}
            >
               <Image src="/svg/settings.svg" alt="" width={20} height={20} />
            </button>
            {currentBot?.status !== 'online' ? (
               <></>
            ) : (
               <>
                  <button
                     className={styles.button_leave}
                     onClick={ConnectButtonHandler}
                  >
                     <Image
                        src="/svg/rotate.svg"
                        alt=""
                        width={20}
                        height={20}
                     />
                  </button>
                  <button
                     className={styles.button_leave}
                     onClick={DisconnectButtonHandler}
                  >
                     Отключить
                  </button>
               </>
            )}
         </div>
      </div>
   );
};

export default Header;
