import { routes } from '@/app/constants';
import { BotContext } from '@/app/context/BotContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';
import styles from '../../styles.module.scss';

const Header = () => {
   const { socket } = useContext(SocketContext);
   const { bot } = useContext(BotContext);
   const router = useRouter();

   const ConnectButtonHandler = () => {
      if (socket) {
         socket.emit('connect-to-server', {
            botId: bot?.id,
         });
      }
   };
   const DisconnectButtonHandler = () => {
      if (socket) {
         socket.emit('logout', {
            botId: bot?.id,
         });
      }
   };
   return (
      <div className={styles.header}>
         <div className={styles.avatar}>
            <img src="https://minotar.net/helm/sdfgsdfgkhbsdtg/37" alt="" />
         </div>
         <div className={styles.left_side}>
            <p className={styles.username}>
               {bot?.username} <span className={styles.bot_id}>{bot?.id}</span>
               {bot?.status === 'online' ? (
                  <span className={styles.green}>{bot?.status}</span>
               ) : (
                  <span className={styles.red}>{bot?.status}</span>
               )}
            </p>
            <p className={styles.server}>{bot?.server}</p>
         </div>
         <div className={styles.right_side}>
            <button
               className={styles.button_leave}
               onClick={() => router.push(routes.SETTINGS + bot?.id)}
            >
               <Image src="/svg/settings.svg" alt="" width={20} height={20} />
            </button>
            {bot?.status !== 'online' ? (
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
                     <Image
                        src="/svg/power.svg"
                        alt=""
                        width={20}
                        height={20}
                     />
                  </button>
               </>
            )}
         </div>
      </div>
   );
};

export default Header;
