import { BotContext } from '@/app/bot/BotProvider';
import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import { blocksConstructor } from '@/app/bot/control-panel/[botId]/data';
import { useSetActivatedMacros } from '@/hooks/bot/control-panel/macroses/useSetActivatedMacros';
import { useUpdateMacros } from '@/hooks/bot/control-panel/macroses/useUpdateMacros';
import { IBotMacrosConstructorBlock } from '@/interfaces';
import { useContext, useState } from 'react';
import { MacrosContext } from '../../../../../../../app/bot/control-panel/[botId]/_providers/MacrosContext';
import { GetActionBlock } from './GetActionBlock';
import { GetEventBlock } from './GetEventBlock';

export const MacrosBuild = () => {
   const { bot, setBot } = useContext(BotContext);
   const {
      editableMacros,
      setEditableMacros,
      blocksLimit,
      showUpdate,
      setShowUpdate,
   } = useContext(MacrosContext);

   const { mutateAsync: updateMacros, isLoading, error } = useUpdateMacros();
   const {
      mutateAsync: setActiveMacros,
      isLoading: setActiveMacrosLoading,
      error: setActiveMacrosError,
   } = useSetActivatedMacros();

   const [draggableBlock, setDraggableBlock] =
      useState<IBotMacrosConstructorBlock>();

   const handleOnDrag = (
      e: DragEvent | any,
      block: IBotMacrosConstructorBlock
   ) => {
      setDraggableBlock(block);
   };

   const handleOnDrop = (e: DragEvent | any) => {
      e.preventDefault();
      if (!draggableBlock) return;
      setEditableMacros({
         ...editableMacros!,
         blocks: [
            ...editableMacros!.blocks,
            { ...draggableBlock, id: -1, macrosId: -1 },
         ],
      });
      setShowUpdate(true);
   };

   const handleDragOver = (e: DragEvent | any) => {
      e.preventDefault();
   };

   const handleDragLeave = (e: any) => {
      e.target.style.borderBottom = 'none';
   };

   const handleDragEnd = () => {};

   const handleUpdateMacros = async () => {
      const response = await updateMacros({
         blocks: editableMacros!.blocks,
         macrosId: editableMacros!.id,
      });

      if (!response) return;

      setShowUpdate(false);
   };

   const handleSetActiveMacros = async () => {
      const editId =
         bot?.activeMacrosId === editableMacros!.id ? 0 : editableMacros!.id;

      const response: any = await setActiveMacros({
         botId: bot!.id,
         macrosId: editId,
      });
      if (!response) return;
      setBot({ ...bot!, activeMacrosId: response.activeMacrosId });
   };

   return (
      <div className={styles.macros_build}>
         <div className={styles.build_header}>
            <div className={styles.side}>
               <button
                  className={styles.back_button}
                  onClick={() => setEditableMacros(null)}
               >
                  Назад
               </button>
               <div className={styles.macros_title}>
                  {editableMacros?.title
                     ? editableMacros?.title
                     : `Макрос ${editableMacros?.id}`}
               </div>
            </div>
            <div className={styles.side}>
               <div className={styles.timers_limit}>
                  {editableMacros?.blocks.length}/{blocksLimit}
               </div>
               <button
                  className={styles.switch_status}
                  data-color={
                     bot?.activeMacrosId === editableMacros!.id
                        ? 'red'
                        : 'green'
                  }
                  onClick={() => handleSetActiveMacros()}
               >
                  {bot?.activeMacrosId === editableMacros!.id
                     ? 'Деактивировать'
                     : 'Активировать'}
               </button>
            </div>
         </div>

         <div className={styles.content}>
            <div
               className={styles.blocks_editor}
               onDrop={(e) => handleOnDrop(e)}
               onDragOver={(e) => handleDragOver(e)}
            >
               <div className={styles.blocks}>
                  {editableMacros?.blocks.map(
                     (block, i) =>
                        ({
                           event: <GetEventBlock key={i} block={block} />,
                           action: (
                              <GetActionBlock
                                 key={i}
                                 block={block}
                                 handleDragEnd={handleDragEnd}
                                 handleDragLeave={handleDragLeave}
                              />
                           ),
                        })[block.blockType]
                  )}
               </div>
               <div className={styles.editor_footer}>
                  {showUpdate && (
                     <button
                        className={styles.update_button}
                        disabled={isLoading}
                        onClick={handleUpdateMacros}
                     >
                        Обновить макрос
                     </button>
                  )}
               </div>
            </div>
            <div className={styles.blocks_constructor}>
               {blocksConstructor.map((block, i) => (
                  <div
                     key={i}
                     className={styles.constructor_block}
                     draggable
                     onDragStart={(e) => handleOnDrag(e, block)}
                  >
                     {block.title}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};
