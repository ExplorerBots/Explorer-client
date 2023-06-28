import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { CurrentWinowContext } from '../../context/CurrentWindowContext';
import { ItemsContext } from '../../context/ItemsContext';
import { SelectedItemContext } from '../../context/SelectedItemContext';
import { SocketContext } from '../../context/SocketContext';
import styles from '../../styles.module.scss';
import Blur from '../ui/Blur';
import Inventory from './windows/Inventory';
import LargeChest from './windows/LargeChest';
import NineFiveWindow from './windows/NineFiveWindow';
import NineFourWindow from './windows/NineFourWindow';
import SmallChest from './windows/SmallChest';

const InventoryContainer = () => {
   const { socket } = useContext(SocketContext);
   const { items } = useContext(ItemsContext);
   const { currentWindow } = useContext(CurrentWinowContext);
   const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

   useEffect(() => {
      if (currentWindow) {
         setSelectedItem(currentWindow?.selectedItem);
      }
   }, [currentWindow?.selectedItem]);

   useEffect(() => {
      const handleMouseMove = (event: any) => {
         setCursorPosition({ x: event.clientX, y: event.clientY });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
         window.removeEventListener('mousemove', handleMouseMove);
      };
   }, []);

   return (
      <div
         className={styles.inventory_container}
         onContextMenu={(e) => e.preventDefault()}
      >
         <Blur />
         {selectedItem && selectedItem.type !== 0 && (
            <div
               className={styles.taken_item}
               style={{
                  top: cursorPosition.y - 17,
                  left: cursorPosition.x - 17,
               }}
            >
               <div className={styles.taken_item_image}>
                  <Image
                     src={`/MINECRAFT/${selectedItem.name}.png`}
                     alt={selectedItem.name}
                     width={37}
                     height={37}
                     style={{
                        borderRadius: '2px',
                        userSelect: 'none',
                     }}
                     draggable={false}
                  />
               </div>
               <div className={styles.count}>
                  {selectedItem.count > 1 && selectedItem.count}
               </div>
            </div>
         )}

         {currentWindow?.type === 'minecraft:generic_9x3' ? (
            <SmallChest />
         ) : currentWindow?.type === 'minecraft:generic_9x6' ? (
            <LargeChest />
         ) : currentWindow?.type === 'minecraft:generic_9x4' ? (
            <NineFourWindow />
         ) : currentWindow?.type === 'minecraft:generic_9x5' ? (
            <NineFiveWindow />
         ) : (
            <Inventory />
         )}
      </div>
   );
};

export default InventoryContainer;
