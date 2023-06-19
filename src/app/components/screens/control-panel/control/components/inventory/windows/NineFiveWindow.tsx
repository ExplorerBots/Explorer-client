import { IItem } from '@/app/interfaces';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { CurrentWinowContext } from '../../../context/CurrentWindowContext';
import { SocketContext } from '../../../context/SocketContext';
import styles from '../../../styles.module.scss';
import { genFormattedItems } from '../../../utils/genFormattedItems';
import { drawSlots } from '../drawSlots';

const NineFiveWindow = () => {
   const { currentWindow } = useContext(CurrentWinowContext);
   const { socket } = useContext(SocketContext);
   const [title, setTitle] = useState<{ text: string; color: string } | null>(
      null
   );

   const [formattedItems, setFormattedItems] = useState<IItem[] | null>(null);
   if (currentWindow) {
      useEffect(
         () => genFormattedItems(currentWindow?.slots, setFormattedItems),
         [currentWindow.slots]
      );
      useEffect(
         () => setTitle(JSON.parse(currentWindow.title)),
         [currentWindow.title]
      );
   }

   return (
      <div className={styles.small_chest}>
         <button
            className={styles.window_close}
            onClick={() => socket && socket.emit('close-window')}
         >
            <Image src="/svg/cross.svg" alt="" width={20} height={20} />
         </button>
         <div className={styles.chest}>
            <div className={styles.title}>{title?.text}</div>
            <div className={styles.main}>
               {drawSlots(0, 44, formattedItems)}
            </div>
         </div>
         <div className={styles.inventory}>
            <div className={styles.title}>Инвентарь</div>
            <div className={styles.main}>
               {drawSlots(45, 71, formattedItems)}
            </div>
            <div className={styles.hotbar}>
               {drawSlots(72, 81, formattedItems)}
            </div>
         </div>
      </div>
   );
};

export default NineFiveWindow;
