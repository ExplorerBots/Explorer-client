import { BotContext } from '@/app/context/BotContext';
import { IBotMacrosBlock } from '@/app/interfaces';
import { useContext, useEffect, useState } from 'react';
import styles from '../../../styles.module.scss';
import { BlockInput } from './BlockInput';
import { BlockSelect } from './BlockSelect';
import { MacrosContext } from './context/MacrosContext';

export const GetActionBlock = ({
   block,
   handleDragEnd,
   handleDragLeave,
}: {
   block: IBotMacrosBlock;
   handleDragEnd: (e: any) => void;
   handleDragLeave: (e: any) => void;
}) => {
   if (!block.action) return null;
   const { bot } = useContext(BotContext);

   const { setShowUpdate } = useContext(MacrosContext);

   const [timerIds, setTimerIds] = useState<{ key: string; value: string }[]>(
      []
   );

   const [value, setValue] = useState<string>(block.value);
   const [secondValue, setSecondValue] = useState<string>(
      block.secondValue || ''
   );
   const { setEditableMacros, editableMacros } = useContext(MacrosContext);

   const handleOnChangeValue = (v: string) => {
      if (!editableMacros) return;

      setEditableMacros({
         ...editableMacros,
         blocks: [...editableMacros.blocks].map((b) =>
            b === block ? { ...block, value: v } : b
         ),
      });

      setValue(v);
      setShowUpdate(true);
   };

   const handleOnChangeSecondValue = (v: string) => {
      if (!editableMacros) return;

      setEditableMacros({
         ...editableMacros,
         blocks: [...editableMacros.blocks].map((b) =>
            b === block ? { ...block, secondValue: v } : b
         ),
      });
      setSecondValue(v);
      setShowUpdate(true);
   };

   const handleDeleteBlock = () => {
      if (!editableMacros) return;

      setEditableMacros({
         ...editableMacros,
         blocks: [...editableMacros.blocks].filter((b) => b !== block),
      });
      setShowUpdate(true);
   };

   useEffect(
      () =>
         setTimerIds(
            bot!.timers.map((t) => {
               return { key: `${t.id}`, value: `${t.id}` };
            })
         ),
      [bot?.timers]
   );

   useEffect(() => {
      setSecondValue(String(timerIds[0]));
   }, [timerIds]);

   return (
      <div
         className={styles.action_block}
         onDragLeave={handleDragLeave}
         onDragEnd={handleDragEnd}
      >
         <div className={styles.side} onClick={(e) => e.stopPropagation()}>
            {
               {
                  wait: (
                     <>
                        <div className={styles.block_title}>Ждать</div>
                        <BlockInput
                           placeholder="Сколько"
                           type="number"
                           min={1000}
                           value={value}
                           onChange={(e) =>
                              handleOnChangeValue(e.currentTarget.value)
                           }
                        />
                        <BlockSelect
                           value={secondValue}
                           onChange={(e) =>
                              handleOnChangeSecondValue(e.currentTarget.value)
                           }
                           options={[
                              { key: 's', value: 's' },
                              { key: 'ms', value: 'ms' },
                           ]}
                        />
                     </>
                  ),
                  message: (
                     <>
                        <div className={styles.block_title}>Сообщение</div>
                        <BlockInput
                           placeholder="Сообщение"
                           type="text"
                           value={value}
                           onChange={(e) =>
                              handleOnChangeValue(e.currentTarget.value)
                           }
                        />
                     </>
                  ),
                  'use-item': (
                     <>
                        <div className={styles.block_title}>
                           Активировать предмет в руке
                        </div>
                     </>
                  ),
                  'set-quick-bar-slot': (
                     <>
                        <div className={styles.block_title}>
                           Выбрать слот хотбара
                        </div>
                        <BlockSelect
                           value={secondValue}
                           onChange={(e) =>
                              handleOnChangeSecondValue(e.currentTarget.value)
                           }
                           options={[
                              { key: '1', value: '1' },
                              { key: '2', value: '2' },
                              { key: '3', value: '3' },
                              { key: '4', value: '4' },
                              { key: '5', value: '5' },
                              { key: '6', value: '6' },
                              { key: '7', value: '7' },
                              { key: '8', value: '8' },
                              { key: '9', value: '9' },
                           ]}
                        />
                     </>
                  ),
                  'click-window': (
                     <>
                        <div className={styles.block_title}>Клик по окну</div>
                        <BlockInput
                           placeholder="Слот"
                           type="number"
                           value={value}
                           onChange={(e) =>
                              handleOnChangeValue(e.currentTarget.value)
                           }
                        />
                        <BlockSelect
                           value={secondValue}
                           onChange={(e) =>
                              handleOnChangeSecondValue(e.currentTarget.value)
                           }
                           options={[
                              { key: '0', value: 'Лкм' },
                              { key: '1', value: 'Пкм' },
                           ]}
                        />
                     </>
                  ),
                  autoclicker: (
                     <>
                        <div className={styles.block_title}>Автокликер</div>

                        <BlockSelect
                           value={value}
                           onChange={(e) =>
                              handleOnChangeValue(e.currentTarget.value)
                           }
                           options={[
                              { key: 'true', value: 'Вкл' },
                              { key: 'false', value: 'Выкл' },
                           ]}
                        />
                     </>
                  ),
                  'auto-eat': (
                     <>
                        <div className={styles.block_title}>Авто-еда</div>

                        <BlockSelect
                           value={value}
                           onChange={(e) =>
                              handleOnChangeValue(e.currentTarget.value)
                           }
                           options={[
                              { key: 'true', value: 'Вкл' },
                              { key: 'false', value: 'Выкл' },
                           ]}
                        />
                     </>
                  ),
                  timer: (
                     <>
                        <div className={styles.block_title}>Таймер</div>
                        <BlockSelect
                           value={value}
                           onChange={(e) =>
                              handleOnChangeValue(e.currentTarget.value)
                           }
                           options={[
                              { key: 'true', value: 'Вкл.' },
                              { key: 'false', value: 'Выкл.' },
                           ]}
                        />
                        <BlockSelect
                           value={secondValue}
                           onChange={(e) =>
                              handleOnChangeSecondValue(e.currentTarget.value)
                           }
                           options={timerIds}
                        />
                     </>
                  ),
               }[block.action]
            }
         </div>
         <div className={styles.side} onClick={(e) => e.stopPropagation()}>
            {block.event !== 'spawn' && (
               <button
                  className={styles.delete_block}
                  onClick={handleDeleteBlock}
               >
                  x
               </button>
            )}
         </div>
      </div>
   );
};
