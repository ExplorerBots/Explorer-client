import { PropsWithChildren } from 'react';
import SlotImage from './SlotImage';

const HotBarSlots: React.FC<
   PropsWithChildren<{
      slot: number;
      classSlot: string;
      classSlotImage: string;
      classSlots: string;
   }>
> = ({ classSlot, classSlotImage, classSlots }) => {
   return (
      <div className={classSlots}>
         <div className={classSlot}>
            <div className={classSlotImage}>
               <SlotImage />
            </div>
         </div>
         <div className={classSlot}>
            <div className={classSlotImage}>
               <SlotImage />
            </div>
         </div>
         <div className={classSlot}>
            <div className={classSlotImage}>
               <SlotImage />
            </div>
         </div>
         <div className={classSlot}>
            <div className={classSlotImage}>
               <SlotImage />
            </div>
         </div>
         <div className={classSlot}>
            <div className={classSlotImage}>
               <SlotImage />
            </div>
         </div>
         <div className={classSlot}>
            <div className={classSlotImage}>
               <SlotImage />
            </div>
         </div>
         <div className={classSlot}>
            <div className={classSlotImage}>
               <SlotImage />
            </div>
         </div>
         <div className={classSlot}>
            <div className={classSlotImage}>
               <SlotImage />
            </div>
         </div>
         <div className={classSlot}>
            <div className={classSlotImage}>
               <SlotImage />
            </div>
         </div>
      </div>
   );
};

export default HotBarSlots;
