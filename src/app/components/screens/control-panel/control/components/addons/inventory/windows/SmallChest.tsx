import { IItem } from '@/app/interfaces';
import { useContext, useEffect, useState } from 'react';
import { CurrentWinowContext } from '../../../../context/CurrentWindowContext';
import { SelectedItemContext } from '../../../../context/SelectedItemContext';
import { SocketContext } from '../../../../context/SocketContext';
import styles from '../../../../styles.module.scss';
import { genFormattedItems } from '../../../../utils/genFormattedItems';
import WindowCloseButton from '../../../ui/WindowCloseButton';
import WindowReloadButton from '../../../ui/WindowReloadButton';
import { drawSlots } from '../drawSlots';

const SmallChest = () => {
   const { currentWindow } = useContext(CurrentWinowContext);
   const { socket } = useContext(SocketContext);
   const { selectedItem } = useContext(SelectedItemContext);

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
         <div className={styles.chest}>
            <div className={styles.window_header}>
               <div className={styles.title}>{title?.text}</div>
               <div className={styles.buttons}>
                  <WindowReloadButton />
                  <WindowCloseButton />
               </div>
            </div>
            <div className={styles.main}>
               {drawSlots(0, 26, formattedItems, socket, selectedItem)}
            </div>
         </div>
         <div className={styles.inventory}>
            <div className={styles.title}>Инвентарь</div>
            <div className={styles.main}>
               {drawSlots(27, 53, formattedItems, socket, selectedItem)}
            </div>
            <div className={styles.hotbar}>
               {drawSlots(54, 62, formattedItems, socket, selectedItem)}
            </div>
         </div>
      </div>
   );
};

export default SmallChest;
