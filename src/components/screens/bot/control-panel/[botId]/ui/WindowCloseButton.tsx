import { SocketContext } from '@/app/bot/control-panel/[botId]/_providers/SocketContext';
import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import Image from 'next/image';
import { useContext } from 'react';

const WindowCloseButton = () => {
   const { socket } = useContext(SocketContext);

   return (
      <button
         className={styles.window_header_button}
         onClick={() => socket && socket.emit('close-window')}
      >
         <Image src="/svg/cross.svg" alt="" width={20} height={20} />
      </button>
   );
};
export default WindowCloseButton;
