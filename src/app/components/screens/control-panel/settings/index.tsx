import { IBot } from '@/app/interfaces';
import { botsService } from '@/app/services/bots.service';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'react-toastify';
import ExtendBotModal from '../components/ExtendBotModal/ExtendBotModal';
import styles from './styles.module.scss';

interface IBotSettingsScreenProps {
   currentBot: IBot | null;
   setCurrentBot: (currentBot: IBot) => void;
   loading: boolean;
}

const BotSettingsScreen: FC<PropsWithChildren<IBotSettingsScreenProps>> = ({
   currentBot,
   setCurrentBot,
   loading,
}) => {
   const [username, setUsername] = useState('');
   const [extendBot, setExtendBot] = useState<IBot | null>(null);
   const [showUsernameButton, setShowUsernameButton] = useState<boolean>(false);
   const router = useRouter();

   const changeUsername = () => {
      if (currentBot) {
         botsService
            .changeUsername(currentBot?.id, username)
            .then((data) => {
               setCurrentBot({ ...currentBot, username: data });
               setUsername(data);
               toast.success(`Успешная смена никнейма!`);
            })
            .finally(() => setShowUsernameButton(false));
      }
   };

   return (
      <div className={styles.settings_container}>
         <div className={styles.header}>
            <div className={styles.header_title}>
               Настрока бота {router.query.botId}
            </div>
         </div>
         <div className={styles.body}>
            {loading ? (
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
                              defaultValue={currentBot?.username}
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
                     <div className={styles.block_title}>Ранг бота</div>

                     <div className={styles.block_content}>
                        <div className={styles.inner_block}>
                           <div className={styles.bot_rank}>
                              {currentBot?.isPremium ? 'Premium' : 'Classic'}
                           </div>
                           <button className={styles.default_button}>
                              {currentBot?.isPremium ? 'Ухудьшить' : 'Улучшить'}
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className={styles.block}>
                     <div className={styles.block_title}>Подписка</div>

                     <div className={styles.block_content}>
                        <div className={styles.inner_block}>
                           <div className={styles.bot_rank}>
                              Конец:{' '}
                              {currentBot &&
                                 new Date(currentBot?.endDate).toLocaleString()}
                           </div>
                           <button
                              className={styles.default_button}
                              onClick={() => setExtendBot(currentBot)}
                           >
                              Продлить
                           </button>
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
