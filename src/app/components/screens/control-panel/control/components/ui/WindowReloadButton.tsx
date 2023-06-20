import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/SocketContext';
import styles from '../../styles.module.scss';

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
