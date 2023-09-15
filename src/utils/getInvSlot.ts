export const getInvSlot = (slot: number, quickSlot: number) => {
   switch (slot) {
      case 36:
         if (quickSlot === 0) return 36;
         break;
      case 37:
         if (quickSlot === 1) return 37;
         break;
      case 38:
         if (quickSlot === 2) return 38;
         break;
      case 39:
         if (quickSlot === 3) return 39;
         break;
      case 40:
         if (quickSlot === 4) return 40;
         break;
      case 41:
         if (quickSlot === 5) return 41;
         break;
      case 42:
         if (quickSlot === 6) return 42;
         break;
      case 43:
         if (quickSlot === 7) return 43;
         break;
      case 44:
         if (quickSlot === 8) return 44;
         break;
   }
};
