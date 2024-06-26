import { IItem } from '@/app/interfaces';
import Image from 'next/image';
import { Socket } from 'socket.io-client';
import styles from '../../../styles.module.scss';
import { nullItem } from '../../../utils/genFormattedItems';

export const drawSlots = (
   from: number,
   to: number,
   formattedItems: IItem[] | null,
   socket: Socket | null,
   selectedItem: IItem | null
) => {
   if (!formattedItems) return;
   if (!formattedItems?.length) {
      for (let i = 0; i <= 45; i++) {
         formattedItems.push(nullItem(i));
      }
   }
   const filteredItems = formattedItems.filter(
      (item, i) => item?.slot >= from && item?.slot <= to
   );

   const handleClickSlot = (item: IItem, mouseButton: number) => {
      if (!socket) return;
      socket.emit('click-window', { slot: item.slot, mouseButton });
   };

   return filteredItems.map((item, i) => {
      return (
         <div
            className={styles.slot}
            key={i}
            onClick={() => handleClickSlot(item, 0)}
            onContextMenu={() => handleClickSlot(item, 1)}
            // onMouseEnter={(e) => handleOnSlotEnter(e)}
            // onMouseLeave={(e) => handleOnSlotLeave(e)}
            data-taken={item.slot === selectedItem?.slot ? 'true' : 'false'}
            data-slot={item.slot}
         >
            {item.type > 0 && (
               <>
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
                  <div className={styles.count}>
                     {item.count && item.count > 1 && item.count}
                  </div>
               </>
            )}
         </div>
      );
   });
};
