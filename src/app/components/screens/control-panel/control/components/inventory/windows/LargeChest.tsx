import { IItem } from '@/app/interfaces';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { CurrentWinowContext } from '../../../context/CurrentWindowContext';
import { SocketContext } from '../../../context/SocketContext';
import styles from '../../../styles.module.scss';
import { genFormattedItems } from '../../../utils/genFormattedItems';
import { drawSlots } from '../drawSlots';

const LargeChest = () => {
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
               {drawSlots(0, 53, formattedItems)}
            </div>
         </div>
         <div className={styles.inventory}>
            <div className={styles.title}>Inventory</div>
            <div className={styles.main}>
               {drawSlots(54, 80, formattedItems)}
            </div>
            <div className={styles.hotbar}>
               {drawSlots(81, 89, formattedItems)}
            </div>
         </div>
      </div>
   );
};

export default LargeChest;
