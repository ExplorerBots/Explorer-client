import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import { IBotMacrosBlock } from '@/interfaces';

export const GetEventBlock = ({ block }: { block: IBotMacrosBlock }) => {
   if (!block.event) return null;

   return (
      <div className={styles.event_block}>
         <div className={styles.side}>
            {
               {
                  spawn: <div className={styles.block_title}>Ивент: Spawn</div>,
               }[block.event]
            }
         </div>
         <div className={styles.side}>
            {block.event !== 'spawn' && (
               <button className={styles.delete_block}>x</button>
            )}
         </div>
      </div>
   );
};
