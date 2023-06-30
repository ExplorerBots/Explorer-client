import { FC, PropsWithChildren, useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import styles from '../styles.module.scss';
import ChangeBalanceModal from './modals/ChangeBalanceModal';
import ChangeUsernameModal from './modals/ChangeUsernameModal';

interface IControlBlockProps {}

const ControlBlock: FC<PropsWithChildren<IControlBlockProps>> = () => {
   const { user } = useContext(UserContext);

   const [showChangeUsernameModal, setShowChangeUsernameModal] =
      useState<boolean>(false);
   const [showChangeBalanceModal, setShowChangeBalanceModal] =
      useState<boolean>(false);
   const [showConfigBotModal, setShowConfigBotModal] = useState<boolean>(false);

   return (
      <div className={styles.control_block}>
         <div className={styles.block_title}>Контроль</div>

         <div className={styles.line}>
            <button
               className={styles.enter_button}
               onClick={() => setShowChangeBalanceModal(true)}
            >
               Изменить баланс
            </button>
            <ChangeBalanceModal
               active={showChangeBalanceModal}
               setActive={setShowChangeBalanceModal}
            />

            <button
               className={styles.enter_button}
               onClick={() => setShowChangeUsernameModal(true)}
            >
               Изменить Никнейм
            </button>
            <ChangeUsernameModal
               active={showChangeUsernameModal}
               setActive={setShowChangeUsernameModal}
            />

            {user?.partner ? (
               <button className={styles.enter_button}>Забрать партнера</button>
            ) : (
               <button className={styles.enter_button}>Выдать партнера</button>
            )}
         </div>

         {/* <div className={styles.line}></div> */}
      </div>
   );
};

export default ControlBlock;
