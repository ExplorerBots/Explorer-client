import { CurrentWinowContext } from '@/app/bot/control-panel/[botId]/_providers/CurrentWindowContext';
import { SelectedItemContext } from '@/app/bot/control-panel/[botId]/_providers/SelectedItemContext';
import { SocketContext } from '@/app/bot/control-panel/[botId]/_providers/SocketContext';
import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import { genFormattedItems } from '@/app/bot/control-panel/[botId]/utils';
import { IItem } from '@/interfaces';
import { useContext, useEffect, useState } from 'react';
import WindowCloseButton from '../../../ui/WindowCloseButton';
import WindowReloadButton from '../../../ui/WindowReloadButton';
import { drawSlots } from '../drawSlots';

const LargeChest = () => {
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
               {drawSlots(0, 53, formattedItems, socket, selectedItem)}
            </div>
         </div>
         <div className={styles.inventory}>
            <div className={styles.title}>Inventory</div>
            <div className={styles.main}>
               {drawSlots(54, 80, formattedItems, socket, selectedItem)}
            </div>
            <div className={styles.hotbar}>
               {drawSlots(81, 89, formattedItems, socket, selectedItem)}
            </div>
         </div>
      </div>
   );
};

export default LargeChest;
