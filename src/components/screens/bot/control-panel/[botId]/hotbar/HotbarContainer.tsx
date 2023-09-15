import { ItemsContext } from '@/app/bot/control-panel/[botId]/_providers/ItemsContext';
import { SocketContext } from '@/app/bot/control-panel/[botId]/_providers/SocketContext';
import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import {
   genFormattedItems,
   nullItem,
} from '@/app/bot/control-panel/[botId]/utils';
import { IBotInfo, IItem } from '@/interfaces';
import { getQuickSlot } from '@/utils/get-quick-slot';
import { getInvSlot } from '@/utils/getInvSlot';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import Blur from '../ui/Blur';

const HotbarContainer = () => {
   const { socket } = useContext(SocketContext);
   const { items } = useContext(ItemsContext);

   const [formattedItems, setFormattedItems] = useState<IItem[]>([]);
   const [quickBarSlot, setQuickbarSlot] = useState<number>(0);
   const [botInfo, setBotInfo] = useState<IBotInfo>({
      health: 1,
      food: 1,
      experience: 1,
   });

   useEffect(() => genFormattedItems(items, setFormattedItems), [items]);

   useEffect(() => {
      if (!formattedItems?.length) {
         for (let i = 0; i <= 45; i++) {
            formattedItems.push(nullItem(i));
         }
      }
   }, [formattedItems]);

   const hotbarSlots: IItem[] = formattedItems.filter(
      (item) => item.slot >= 36 && item.slot <= 44
   );

   const handleQuickSlotClick = (slot: number) => {
      if (!socket) return;
      if (slot === quickBarSlot) {
         socket.emit('use-item');
      } else {
         socket.emit('set-quick-bar-slot', slot);
      }
   };

   useEffect(() => {
      if (!socket) return;

      socket.on('set-quick-bar-slot', (slot: number) => {
         setQuickbarSlot(slot);
      });

      socket.on('set-info', (data: IBotInfo) => {
         setBotInfo(data);
      });
   }, [socket]);

   return (
      <div className={styles.hotbar_container}>
         <Blur />
         <div className={styles.info}>
            <div className={styles.health}>
               <span className={styles.health_count}>
                  {botInfo?.health?.toFixed()}
               </span>{' '}
               health
            </div>
            <div className={styles.xp}>
               <span className={styles.xp_count}>
                  {botInfo?.experience?.toFixed()}
               </span>{' '}
               experience
            </div>
            <div className={styles.food}>
               <span className={styles.food_count}>
                  {botInfo?.food?.toFixed()}
               </span>{' '}
               food
            </div>
         </div>
         <div className={styles.hotbar}>
            {hotbarSlots.map((item, i) => (
               <div
                  onClick={() => {
                     handleQuickSlotClick(getQuickSlot(item.slot));
                  }}
                  className={styles.slot}
                  key={i}
                  data-quick-slot={
                     getInvSlot(item.slot, quickBarSlot) === item.slot
                        ? 'true'
                        : 'false'
                  }
               >
                  {item.name && (
                     <Image
                        src={`/MINECRAFT/${item.name}.png`}
                        alt={item.name}
                        width={37}
                        height={37}
                        style={{
                           borderRadius: '2px',
                           userSelect: 'none',
                        }}
                     />
                  )}

                  <div className={styles.count}>
                     {item.count > 1 && item.count}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default HotbarContainer;
