import { SocketContext } from '@/app/bot/control-panel/[botId]/_providers/SocketContext';
import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

const WindowReloadButton = () => {
   const { socket } = useContext(SocketContext);
   const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      if (socket) {
         socket.on('set-current-window', () => {
            setLoading(false);
         });
      }
   }, [socket]);

   return (
      <button
         className={styles.window_header_button}
         onClick={() => {
            socket && socket.emit('get-current-window');
            setLoading(true);
         }}
         data-loading={loading && true}
      >
         {loading ? (
            <Image src="/svg/preloader.svg" alt="" width={20} height={20} />
         ) : (
            <Image src="/svg/rotate.svg" alt="" width={17} height={17} />
         )}
      </button>
   );
};
export default WindowReloadButton;
