import { BotContext } from '@/app/bot/BotProvider';
import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import { useContext, useState } from 'react';
import Switcher, { Side } from '../../ui/Switcher';

const AutoclickerContainer = () => {
   const { bot } = useContext(BotContext);
   const [switchSelected, setSwitchSelected] = useState<Side>({
      key: '0',
      value: 'ЛКМ',
   });

   return (
      <div className={styles.autoclicker_container}>
         {/* <Blur /> */}
         <div className={styles.autoclicker_block}>
            <div className={styles.title}>Автокликер [ms]</div>
            <div className={styles.content}>
               <input
                  type="number"
                  className={styles.input_value}
                  defaultValue={1000}
               />
               <Switcher
                  selected={switchSelected}
                  setSelected={setSwitchSelected}
                  sides={[
                     { key: '0', value: 'ЛКМ' },
                     { key: '1', value: 'ПКМ' },
                  ]}
               />
               <button
                  data-disabled={bot?.status === 'online' ? false : true}
                  className={styles.power_button}
               >
                  Старт
               </button>
            </div>
         </div>
      </div>
   );
};

export default AutoclickerContainer;
