import { IBotWhitelistUser } from '@/app/interfaces';
import { useState } from 'react';
import styles from '../../../styles.module.scss';
import Switcher, { Side } from '../../ui/Switcher';

export const AutoLeave = () => {
   const [whitelist, setWhitelist] = useState<IBotWhitelistUser[]>([]);
   const [inputWhitelist, setInputWhitelist] = useState<string>('');
   const [radius, setRadius] = useState<number>(32);
   const [mode, setMode] = useState<Side>({
      key: '0',
      value: 'Выход с сервера',
   });

   return (
      <div className={styles.autoleave_container}>
         <div className={styles.block}>
            <div className={styles.title}>Радиус проверки: {radius}</div>
            <div className={styles.input_block}>
               <div className={styles.value}>2</div>
               <input
                  type="range"
                  className={styles.input}
                  min={2}
                  max={64}
                  value={radius}
                  onChange={(e) => setRadius(Number(e.currentTarget.value))}
               />
               <div className={styles.value}>64</div>
            </div>
         </div>

         <div className={styles.block}>
            <div className={styles.title}>Действие</div>
            <Switcher
               selected={mode}
               setSelected={setMode}
               sides={[
                  { key: '0', value: 'Выход с сервера' },
                  { key: '1', value: 'Ваша команда' },
               ]}
            />

            {
               {
                  '0': (
                     <div className={styles.message}>Бот выйдет с сервера</div>
                  ),
                  '1': (
                     <input
                        type="text"
                        placeholder="/hub"
                        className={styles.input}
                     />
                  ),
               }[mode.key]
            }
         </div>
      </div>
   );
};
