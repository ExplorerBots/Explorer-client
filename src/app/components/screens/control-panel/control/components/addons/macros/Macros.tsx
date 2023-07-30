import { limits } from '@/app/constants';
import { BotContext } from '@/app/context/BotContext';
import { IBotMacros } from '@/app/interfaces';
import { useContext, useEffect, useState } from 'react';
import styles from '../../../styles.module.scss';
import { MacrosContext } from './context/MacrosContext';
import { MacrosBuild } from './MacrosBuild';
import { MacrosesList } from './MacrosesList';

export const Macros = () => {
   const [editableMacros, setEditableMacros] = useState<IBotMacros | null>(
      null
   );
   const { bot } = useContext(BotContext);

   const [showUpdate, setShowUpdate] = useState<boolean>(false);
   const [macrosesLimit, setMacrosesLimit] = useState<number>();
   const [blocksLimit, setBlocksLimit] = useState<number>();

   useEffect(() => {
      if (bot?.isPremium) {
         setMacrosesLimit(limits.PREMIUM_MACROSES);
         setBlocksLimit(limits.PREMIUM_MACROS_BLOCKS);
      } else {
         setMacrosesLimit(limits.CLASSIC_MACROSES);
         setBlocksLimit(limits.CLASSIC_MACROS_BLOCKS);
      }
   }, [bot]);

   return (
      <MacrosContext.Provider
         value={{
            editableMacros,
            setEditableMacros,
            showUpdate,
            setShowUpdate,
            macrosesLimit: macrosesLimit || 0,
            blocksLimit: blocksLimit || 0,
         }}
      >
         <div className={styles.activity_container}>
            {editableMacros ? <MacrosBuild /> : <MacrosesList />}
         </div>
      </MacrosContext.Provider>
   );
};
