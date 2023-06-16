import { IItem } from '@/app/interfaces';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../../context/ItemsContext';
import { SocketContext } from '../../context/SocketContext';
import styles from '../../styles.module.scss';

const InventoryContainer = () => {
   const { socket } = useContext(SocketContext);
   const { items } = useContext(ItemsContext);

   const [displayedItems, setDisplayedItems] = useState<IItem[]>([]);

   useEffect(() => {
      if (!items) return;

      const resultItems: IItem[] = [];

      for (let i = 0; i <= 45; i++) {
         const findedItem = items.find((item) => item.slot === i);

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

   const hotbarSlots: IItem[] = displayedItems.filter(
      (item) => item.slot >= 36 && item.slot <= 44
   );

   const mainSlots: IItem[] = displayedItems.filter(
      (item) => item.slot >= 9 && item.slot <= 35
   );

   const armorSlots: IItem[] = displayedItems.filter(
      (item) => item.slot >= 5 && item.slot <= 8
   );

   const offhandSlot: IItem[] = displayedItems.filter(
      (item) => item.slot === 45
   );

   const craftingSlotsUp: IItem[] = displayedItems.filter(
      (item) => item.slot >= 1 && item.slot <= 2
   );
   const craftingSlotsDown: IItem[] = displayedItems.filter(
      (item) => item.slot >= 3 && item.slot <= 4
   );
   const craftingResultSlot: IItem[] = displayedItems.filter(
      (item) => item.slot === 0
   );

   const drawSlots = (arr: IItem[]) => {
      return arr.map((slot, i) => (
         <div className={styles.slot} key={i}>
            <i className={styles.slot_image}></i>
            <div className={styles.count}>{slot.count > 1 && slot.count}</div>
         </div>
      ));
   };

   return (
      <div className={styles.inventory_container}>
         <div className={styles.inventory}>
            <div className={styles.up}>
               <div className={styles.armor}>{drawSlots(armorSlots)}</div>
               <div className={styles.steve}>
                  {/* <Image
                     src="/png/shulker.gif"
                     alt=""
                     width={120}
                     height={192}
                     style={{
                        transform: 'scale(-1, 1)',
                        opacity: '0.6',
                        paddingBottom: '5px',
                     }}
                  /> */}
               </div>
               <div className={styles.offhand}>{drawSlots(offhandSlot)}</div>
               <div className={styles.crafting}>
                  <div className={styles.title}>Crafting</div>
                  <div className={styles.crafting_container}>
                     <div className={styles.crafting_slots}>
                        <div className={styles.side}>
                           {drawSlots(craftingSlotsUp)}
                        </div>
                        <div className={styles.side}>
                           {drawSlots(craftingSlotsDown)}
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
                        {drawSlots(craftingResultSlot)}
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.down}>
               <div className={styles.main}>{drawSlots(mainSlots)}</div>
               <div className={styles.hotbar}>{drawSlots(hotbarSlots)}</div>
            </div>
         </div>
      </div>
   );
};

export default InventoryContainer;
