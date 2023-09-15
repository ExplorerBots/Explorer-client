import { ItemsContext } from '@/app/bot/control-panel/[botId]/_providers/ItemsContext';
import { SelectedItemContext } from '@/app/bot/control-panel/[botId]/_providers/SelectedItemContext';
import { SocketContext } from '@/app/bot/control-panel/[botId]/_providers/SocketContext';
import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import { genFormattedItems } from '@/app/bot/control-panel/[botId]/utils';
import { IItem } from '@/interfaces';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { drawSlots } from '../drawSlots';

const Inventory = () => {
   const { items } = useContext(ItemsContext);
   const { selectedItem } = useContext(SelectedItemContext);
   const { socket } = useContext(SocketContext);

   const [formattedItems, setFormattedItems] = useState<IItem[] | null>(null);
   useEffect(() => genFormattedItems(items, setFormattedItems), [items]);

   return (
      <div className={styles.inventory} onClick={(e) => e.stopPropagation()}>
         <div className={styles.up}>
            <div className={styles.armor}>
               {drawSlots(5, 8, formattedItems, socket, selectedItem)}
            </div>
            <div className={styles.steve}></div>
            <div className={styles.offhand}>
               {drawSlots(45, 45, formattedItems, socket, selectedItem)}
            </div>
            <div className={styles.crafting}>
               <div className={styles.title}>Crafting</div>
               <div className={styles.crafting_container}>
                  <div className={styles.crafting_slots}>
                     <div className={styles.side}>
                        {drawSlots(1, 2, formattedItems, socket, selectedItem)}
                     </div>
                     <div className={styles.side}>
                        {drawSlots(3, 4, formattedItems, socket, selectedItem)}
                     </div>
                  </div>
                  <div className={styles.arrow}>
                     <Image
                        src="/svg/arrow_right.svg"
                        alt=""
                        width={40}
                        height={40}
                     />
                  </div>
                  <div className={styles.crafting_result}>
                     {drawSlots(0, 0, formattedItems, socket, selectedItem)}
                  </div>
               </div>
            </div>
         </div>
         <div className={styles.down}>
            <div className={styles.main}>
               {drawSlots(9, 35, formattedItems, socket, selectedItem)}
            </div>
            <div className={styles.hotbar}>
               {drawSlots(36, 44, formattedItems, socket, selectedItem)}
            </div>
         </div>
      </div>
   );
};

export default Inventory;
