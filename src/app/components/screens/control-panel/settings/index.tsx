import { BotContext } from '@/app/context/BotContext';
import { IBot, IBotWhitelistUser } from '@/app/interfaces';
import { botsService } from '@/app/services/bots/bots.service';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ExtendBotModal from '../components/ExtendBotModal/ExtendBotModal';
import { useAddToWhitelist } from './hooks/useAddToWhitelist';
import { useRemoveToWhitelist } from './hooks/useRemoveToWhitelist';
import styles from './styles.module.scss';

const BotSettingsScreen = () => {
   const [username, setUsername] = useState('');
   const [extendBot, setExtendBot] = useState<IBot | null>(null);
   const [showUsernameButton, setShowUsernameButton] = useState<boolean>(false);
   const [whitelist, setWhitelist] = useState<IBotWhitelistUser[]>([]);
   const [inputWhitelist, setInputWhitelist] = useState<string>('');
   const { bot, setBot, isLoading } = useContext(BotContext);
   const [showConfirmWhitelist, setShowConfirmWhitelist] =
      useState<boolean>(false);

   const changeUsername = () => {
      if (bot) {
         botsService
            .changeUsername(bot?.id, username)
            .then((data) => {
               setBot({ ...bot, username: data });
               setUsername(data);
               toast.success(`Успешная смена никнейма!`);
            })
            .finally(() => setShowUsernameButton(false));
      }
   };

   const {
      mutateAsync: removeToWhitelist,
      isLoading: whitelistRemoveLoading,
      error,
   } = useRemoveToWhitelist();
   const { addToWhitelist, isLoading: whitelistAddLoading } =
      useAddToWhitelist();

   const handleAddToWhitelist = async (username: string) => {
      if (!username) {
         toast.error('Пустая строка');
         return;
      }

      const response = await addToWhitelist({
         botId: bot!.id,
         username,
      });

      setShowConfirmWhitelist(false);
      if (!response) return;

      setWhitelist([...whitelist, { ...response }]);
      toast.success('Успешное изменение вайтлиста');
      setInputWhitelist('');
   };

   const handleRemoveToWhitelist = async (id: number) => {
      const response = await removeToWhitelist(id);

      if (!response) return;

      let sortedWhitelist = [...whitelist];
      sortedWhitelist = sortedWhitelist.filter(
         (item) => item.id !== response.id
      );

      toast.success('Успешное изменение вайтлиста');
      setWhitelist([...sortedWhitelist]);
   };

   useEffect(() => {
      bot?.whitelist && setWhitelist(bot.whitelist);
   }, [bot?.whitelist]);

   return (
      <div className={styles.settings_container}>
         <div className={styles.header}>
            <div className={styles.header_title}>Настрока бота {bot?.id}</div>
         </div>
         <div className={styles.body}>
            {isLoading ? (
               <div className={styles.loading}>
                  <Image
                     src="/svg/preloader.svg"
                     alt=""
                     width={100}
                     height={100}
                  />
                  <div className={styles.loading_text}>Загрузка бота...</div>
               </div>
            ) : (
               <>
                  <div className={styles.block}>
                     <div className={styles.block_title}>Никнейм бота</div>

                     <div className={styles.block_content}>
                        <div className={styles.field}>
                           <input
                              type="text"
                              className={styles.input}
                              defaultValue={bot?.username}
                              onChange={(e) => {
                                 setUsername(e.currentTarget.value);
                                 setShowUsernameButton(true);
                              }}
                              onKeyDown={(e) => {
                                 showUsernameButton &&
                                    e.key === 'Enter' &&
                                    changeUsername();
                              }}
                           />
                           {showUsernameButton && (
                              <button
                                 className={styles.submit_button}
                                 onClick={changeUsername}
                              >
                                 <Image
                                    src="/svg/confirm-icon.svg"
                                    alt=""
                                    width={17}
                                    height={17}
                                 />
                              </button>
                           )}
                        </div>
                     </div>
                  </div>

                  <div className={styles.block}>
                     <div className={styles.block_title}>Ранг</div>

                     <div className={styles.block_content}>
                        <div className={styles.inner_block}>
                           <div className={styles.bot_rank}>
                              {bot?.isPremium ? 'Premium' : 'Classic'}
                           </div>
                           {!bot?.isPremium && (
                              <button className={styles.default_button}>
                                 Улучшить
                              </button>
                           )}
                        </div>
                     </div>
                  </div>

                  <div className={styles.block}>
                     <div className={styles.block_title}>Подписка</div>

                     <div className={styles.block_content}>
                        <div className={styles.inner_block}>
                           <div className={styles.bot_rank}>
                              Конец:{' '}
                              {bot && new Date(bot?.endDate).toLocaleString()}
                           </div>
                           <button
                              className={styles.default_button}
                              onClick={() => setExtendBot(bot)}
                           >
                              Продлить
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className={styles.block}>
                     <div className={styles.block_title}>Вайтлист игроков</div>
                     <div className={styles.block_content}>
                        <div className={styles.field}>
                           <input
                              type="text"
                              className={styles.input}
                              value={inputWhitelist}
                              onKeyDown={(e) => {
                                 e.key === 'Enter' &&
                                    handleAddToWhitelist(e.currentTarget.value);
                              }}
                              onChange={(e) => {
                                 setInputWhitelist(e.currentTarget.value);
                                 setShowConfirmWhitelist(true);
                              }}
                           />
                           {showConfirmWhitelist && (
                              <div
                                 className={styles.submit_button}
                                 onClick={() =>
                                    handleAddToWhitelist(inputWhitelist)
                                 }
                              >
                                 <Image
                                    src="/svg/confirm-icon.svg"
                                    alt=""
                                    width={17}
                                    height={17}
                                 />
                              </div>
                           )}
                        </div>
                        <div className={styles.whitelist}>
                           {whitelist.map((user) => (
                              <div
                                 key={user.id}
                                 className={styles.whitelist_item}
                                 onClick={() =>
                                    handleRemoveToWhitelist(user.id)
                                 }
                              >
                                 {user.username}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </>
            )}
         </div>
         <ExtendBotModal extendBot={extendBot} setExtendBot={setExtendBot} />
      </div>
   );
};

export default BotSettingsScreen;
