import { CurrentWinowContext } from '@/app/bot/control-panel/[botId]/_providers/CurrentWindowContext';
import { SelectedItemContext } from '@/app/bot/control-panel/[botId]/_providers/SelectedItemContext';
import { SocketContext } from '@/app/bot/control-panel/[botId]/_providers/SocketContext';
import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import { genFormattedItems } from '@/app/bot/control-panel/[botId]/utils';
import { IItem } from '@/interfaces';
import { useContext, useEffect, useState } from 'react';
import WindowCloseButton from '../../../../../../bot/control-panel/[botId]/ui/WindowCloseButton';
import WindowReloadButton from '../../../../../../bot/control-panel/[botId]/ui/WindowReloadButton';
import { drawSlots } from '../drawSlots';

const NineFourWindow = () => {
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
               {drawSlots(0, 35, formattedItems, socket, selectedItem)}
            </div>
         </div>
         <div className={styles.inventory}>
            <div className={styles.title}>Инвентарь</div>
            <div className={styles.main}>
               {drawSlots(36, 62, formattedItems, socket, selectedItem)}
            </div>
            <div className={styles.hotbar}>
               {drawSlots(63, 71, formattedItems, socket, selectedItem)}
            </div>
         </div>
      </div>
   );
};

export default NineFourWindow;
