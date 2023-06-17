import { IBotInfo, IItem } from '@/app/interfaces';
import { getQuickSlot } from '@/app/utils/get-quick-slot';
import { getInvSlot } from '@/app/utils/getInvSlot';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../../context/ItemsContext';
import { SocketContext } from '../../context/SocketContext';
import styles from '../../styles.module.scss';

const HotbarContainer = () => {
   const { socket } = useContext(SocketContext);
   const { items } = useContext(ItemsContext);
   const [displayedItems, setDisplayedItems] = useState<IItem[]>([]);
   const [quickBarSlot, setQuickbarSlot] = useState<number>(0);
   const [botInfo, setBotInfo] = useState<IBotInfo>({
      health: 1,
      food: 1,
      experience: 1,
   });

   const hotbarSlots: IItem[] = displayedItems.filter(
      (item) => item.slot >= 36 && item.slot <= 44
   );

   const handleQuickSlotClick = (slot: number) => {
      if (!socket) return;
      if (slot === quickBarSlot) return;

      socket.emit('set-quick-bar-slot', slot);
   };

   useEffect(() => {
      if (!items) return;

      const resultItems: IItem[] = [];

      for (let i = 0; i <= 45; i++) {
         const findedItem = items.find((item) => item?.slot === i);

         if (findedItem) {
            resultItems.push(findedItem);
         } else {
            resultItems.push({
               type: 0,
               count: 0,
               metadata: 0,
               nbt: '',
               name: '',
               displayName: '',
               stackSize: 0,
               slot: i,
            });
         }
      }
      setDisplayedItems(resultItems);
   }, [items]);

   useEffect(() => {
      if (!socket) return;

      socket.on('set-quick-bar-slot', (slot) => {
         setQuickbarSlot(slot);
      });

      socket.on('set-info', (data: IBotInfo) => {
         setBotInfo(data);
      });
   }, [socket]);

   return (
      <div className={styles.hotbar_container}>
         <div className={styles.info}>
            <div className={styles.health}>
               <span className={styles.health_count}>
                  {botInfo.health.toFixed()}
               </span>{' '}
               health
            </div>
            <div className={styles.xp}>
               <span className={styles.xp_count}>
                  {botInfo.experience.toFixed()}
               </span>{' '}
               experience
            </div>
            <div className={styles.food}>
               <span className={styles.food_count}>
                  {botInfo.food.toFixed()}
               </span>{' '}
               food
            </div>
         </div>
         <div className={styles.hotbar}>
            {hotbarSlots.map((item, i) => (
               <div
                  onClick={() => handleQuickSlotClick(getQuickSlot(item.slot))}
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
