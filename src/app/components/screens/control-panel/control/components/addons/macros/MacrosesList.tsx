import { BotContext } from '@/app/context/BotContext';
import { useContext } from 'react';
import styles from '../../../styles.module.scss';
import { MacrosContext } from './context/MacrosContext';
import { useCreateMacros } from './hooks/hooks/useCreateMacros';
import { useDeleteMacros } from './hooks/hooks/useDeleteMacros';

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
      const response = await createMacros({ botId: bot!.id });

      if (!response) return;

      setBot({ ...bot!, macroses: [...bot!.macroses, response] });
   };

   const handleDeleteMacros = async (id: number) => {
      const response = await deleteMacros(id);

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
