import { IItem } from '@/app/interfaces';

export const nullItem = (slot: number) => {
   return {
      type: 0,
      count: 0,
      metadata: 0,
      nbt: '',
      name: '',
      displayName: '',
      stackSize: 0,
      slot: slot,
   };
};

export const genFormattedItems = (
   items: (IItem | null)[] | null,
   setFormattedItems: (resultItems: IItem[]) => void
) => {
   if (!items) return;

   const resultItems: IItem[] = [];
   for (let i = 0; i < items.length; i++) {
      const findedItem = items.find((item) => item?.slot === i);

      if (findedItem) {
         resultItems.push(findedItem);
      } else {
         resultItems.push(nullItem(i));
      }
   }

   setFormattedItems(resultItems);
};
