import { IItem } from '@/app/interfaces';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../../context/ItemsContext';
import { SocketContext } from '../../context/SocketContext';
import styles from '../../styles.module.scss';

const nullItem = (slot: number): IItem => {
   return {
      count: 0,
      metadata: 0,
      nbt: '',
      name: '',
      displayName: '',
      stackSize: 0,
      slot: slot,
      type: 0,
   };
};

const InventoryContainer = () => {
   const { socket } = useContext(SocketContext);
   const { items } = useContext(ItemsContext);

   const [displayedItems, setDisplayedItems] = useState<IItem[]>([]);
   const [takenItem, setTakenItem] = useState<IItem | null>(null);
   const [position, setPosition] = useState({ x: 0, y: 0 });

   const handleMoveItem = (movedItem: IItem) => {
      if (!takenItem) return;

      if (takenItem.slot !== movedItem.slot) {
         if (socket) {
            socket.emit('move-item', {
               sourceSlot: takenItem.slot,
               destSlot: movedItem.slot,
            });
            setTakenItem(null);
         }
      }
   };

   const handleTakeItem = (item: IItem) => {
      if (item.type > 0) {
         setTakenItem(item);
      }

      if (takenItem === item) {
         setTakenItem(null);
         return;
      }
   };

   const handleThrowItem = () => {
      if (!takenItem) return;

      if (socket) {
         socket.emit('throw-items', takenItem);
         setTakenItem(null);
      }
   };

   useEffect(() => {
      const handleMouseMove = (event: any) => {
         setPosition({ x: event.clientX, y: event.clientY });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
         window.removeEventListener('mousemove', handleMouseMove);
      };
   }, []);
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
      return arr.map((item, i) => (
         <div
            className={styles.slot}
            key={i}
            onClick={() => {
               handleMoveItem(item);
            }}
            onMouseDown={() => {
               handleTakeItem(item);
            }}
            data-taken={item.slot === takenItem?.slot ? 'true' : 'false'}
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

            <div className={styles.count}>{item.count > 1 && item.count}</div>
         </div>
      ));
   };

   const handleOnThrowZoneEnter = (e: any) => {
      if (takenItem) {
         e.currentTarget.dataset.active = 'true';
      }
   };
   const handleOnThrowZoneLeave = (e: any) => {
      e.currentTarget.dataset.active = 'false';
   };

   return (
      <div className={styles.inventory_container} onClick={handleThrowItem}>
         {takenItem && takenItem.type !== 0 && (
            <div
               className={styles.taken_item}
               style={{
                  top: position.y - 17,
                  left: position.x - 17,
               }}
            >
               <div className={styles.taken_item_image}>
                  <Image
                     src={`/MINECRAFT/${takenItem.name}.png`}
                     alt={takenItem.name}
                     width={37}
                     height={37}
                     style={{
                        borderRadius: '2px',
                        userSelect: 'none',
                     }}
                  />
               </div>
               <div className={styles.count}>
                  {takenItem.count > 1 && takenItem.count}
               </div>
            </div>
         )}
         <div
            className={styles.throw_items_zone}
            onMouseEnter={(e) => handleOnThrowZoneEnter(e)}
            onMouseLeave={(e) => handleOnThrowZoneLeave(e)}
         />
         <div className={styles.inventory} onClick={(e) => e.stopPropagation()}>
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
         <div
            className={styles.throw_items_zone}
            onMouseEnter={(e) => handleOnThrowZoneEnter(e)}
            onMouseLeave={(e) => handleOnThrowZoneLeave(e)}
         />
      </div>
   );
};

export default InventoryContainer;
