import { BotContext } from '@/app/bot/BotProvider';
import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import { useDeleteMacros } from '@/hooks/bot/control-panel/macroses/useDeleteMacros';
import { useContext } from 'react';
import { MacrosContext } from '../../../../../../../app/bot/control-panel/[botId]/_providers/MacrosContext';
import { useCreateMacros } from '../../../../../../../hooks/bot/control-panel/macroses/useCreateMacros';

export const MacrosesList = () => {
   const { bot, setBot } = useContext(BotContext);
   const { editableMacros, setEditableMacros, macrosesLimit } =
      useContext(MacrosContext);
   const { mutateAsync: createMacros, isLoading, error } = useCreateMacros();
   const {
      mutateAsync: deleteMacros,
      isLoading: deleteMacrosLoading,
      error: deleteMacrosError,
   } = useDeleteMacros();

   const handleCreateButton = async () => {
      const response: any = await createMacros({ botId: bot!.id });

      if (!response) return;

      setBot({ ...bot!, macroses: [...bot!.macroses, response] });
   };

   const handleDeleteMacros = async (id: number) => {
      const response: any = await deleteMacros(id);

      if (!response) return;

      setBot({
         ...bot!,
         macroses: [...bot!.macroses.filter((m) => m.id !== response.id)],
      });
   };

   return (
      <div className={styles.macroses_list}>
         <div className={styles.list_header}>
            <div className={styles.header_title}>Макросы</div>
            <div className={styles.timers_limit}>
               {bot?.macroses?.length}/{macrosesLimit}
            </div>
         </div>
         <div className={styles.list}>
            {bot?.macroses.map((macros, i) => (
               <div
                  key={i}
                  className={styles.list_item}
                  onClick={() => setEditableMacros(macros)}
               >
                  <div className={styles.item_title}>
                     {macros.title ? macros.title : `Макрос ${macros?.id}`}
                  </div>
                  <div className={styles.right_side}>
                     {bot?.activeMacrosId === macros.id ? (
                        <div className={styles.item_status} data-color="green">
                           Active
                        </div>
                     ) : (
                        <div className={styles.item_status} data-color="red">
                           Disabled
                        </div>
                     )}
                     <div
                        className={styles.item_delete}
                        onClick={(e) => {
                           handleDeleteMacros(macros.id);
                           e.stopPropagation();
                        }}
                     >
                        <div className={styles.delete_button}>x</div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
         {bot!.macroses?.length < macrosesLimit && (
            <button
               onClick={handleCreateButton}
               className={styles.confirm_button}
            >
               Создать макрос
            </button>
         )}
      </div>
   );
};
