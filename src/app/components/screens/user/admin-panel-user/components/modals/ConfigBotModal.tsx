import DefaultModal from '@/app/components/ui/modals/defaultModal/DefaultModal';
import { IBot } from '@/app/interfaces';
import { FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useChangeConfigBot } from '../../hooks/useChangeConfigBot';
import styles from '../../styles.module.scss';

interface Props {
   bot: IBot | null;
   setBot: (bot: IBot | null) => void;
}

const ConfigBotModal: FC<PropsWithChildren<Props>> = ({ bot, setBot }) => {
   const [username, setUsername] = useState<string>('');
   const [rang, setRang] = useState<string>('');
   const [server, setServer] = useState<string>('');
   const [termType, setTermType] = useState<string>('give');
   const [termDays, setTermDays] = useState<number>(0);
   const [showSubmit, setShowSubmit] = useState<boolean>(false);

   const { user, setUser } = useContext(UserContext);
   const { changedBot, isLoading, error, mutateAsync } = useChangeConfigBot();

   useEffect(() => {
      if (!bot) return;
      console.log(bot);
      setUsername(bot.username);
      setRang(bot.isPremium ? 'Premium' : 'Classic');
      setServer(bot.server);
   }, [bot]);

   const handleSubmit = async () => {
      if (!bot) return;
      await mutateAsync({
         id: bot.id,
         server,
         termType,
         termDays,
         type: rang,
         username,
      });
      setShowSubmit(false);
   };
   const handleClose = () => {
      setBot(null);
   };

   return (
      <DefaultModal
         active={!!bot}
         loading={false}
         title="Конфигурация бота"
         onSubmit={handleSubmit}
         onClose={handleClose}
         submitDisable={!showSubmit}
      >
         <div className={styles.modal_body}>
            <div className={styles.modal_field}>
               <div className={styles.field_title}>Никнейм</div>
               <input
                  type="text"
                  className={styles.input}
                  value={username}
                  onChange={(e) => {
                     setShowSubmit(true);
                     setUsername(e.currentTarget.value);
                  }}
               />
            </div>

            <div className={styles.modal_field}>
               <div className={styles.field_title}>Ранг</div>
               <select
                  className={styles.input}
                  value={rang}
                  onChange={(e) => {
                     setShowSubmit(true);
                     setRang(e.currentTarget.value);
                  }}
               >
                  <option value="Premium">Premium</option>
                  <option value="Classic">Classic</option>
               </select>
            </div>

            <div className={styles.modal_field}>
               <div className={styles.field_title}>Сервер</div>
               <select
                  className={styles.input}
                  value={server}
                  onChange={(e) => {
                     setShowSubmit(true);
                     setServer(e.currentTarget.value);
                  }}
               >
                  <option value="HolyWorld">HolyWorld</option>
                  <option value="FunTime">FunTime</option>
               </select>
            </div>

            <div className={styles.modal_field}>
               <div className={styles.field_title}>Срок</div>
               <select
                  className={styles.input}
                  value={termType}
                  onChange={(e) => setTermType(e.currentTarget.value)}
               >
                  <option value="give">Добавить</option>
                  <option value="take">Забрать</option>
               </select>

               <input
                  type="number"
                  className={styles.input}
                  value={termDays}
                  placeholder="Сколько дней"
                  onChange={(e) => {
                     setShowSubmit(true);
                     setTermDays(Number(e.currentTarget.value));
                  }}
               />
            </div>
         </div>
      </DefaultModal>
   );
};

export default ConfigBotModal;
