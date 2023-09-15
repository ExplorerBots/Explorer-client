import { UserContext } from '@/app/user/admin-panel/users/[id]/UserContext';
import styles from '@/app/user/admin-panel/users/[id]/_styles.module.scss';
import { FC, PropsWithChildren, useContext, useState } from 'react';
import ChangeBalanceModal from '../modals/ChangeBalanceModal';
import ChangeUsernameModal from '../modals/ChangeUsernameModal';
import CreatePartnerModal from '../modals/CreatePartnerModal';
import DeletePartnerModal from '../modals/DeletePartnerModal';
import ControlButton from './ControlButton';
interface IControlBlockProps {}

const ControlBlock: FC<PropsWithChildren<IControlBlockProps>> = () => {
   const { user } = useContext(UserContext);

   const [showChangeUsername, setShowChangeUsername] = useState<boolean>(false);
   const [showChangeBalance, setShowChangeBalance] = useState<boolean>(false);
   const [showConfigBot, setShowConfigBot] = useState<boolean>(false);
   const [showCreatePartner, setShowCreatePartner] = useState<boolean>(false);
   const [showDeletePartner, setShowDeletePartner] = useState<boolean>(false);

   return (
      <div className={styles.control_block}>
         <div className={styles.block_title}>Контроль</div>

         <div className={styles.line}>
            <ControlButton
               text="Изменить баланс"
               setState={setShowChangeBalance}
            >
               <ChangeBalanceModal
                  active={showChangeBalance}
                  setActive={setShowChangeBalance}
               />
            </ControlButton>

            <ControlButton
               text="Изменить Никнейм"
               setState={setShowChangeUsername}
            >
               <ChangeUsernameModal
                  active={showChangeUsername}
                  setActive={setShowChangeUsername}
               />
            </ControlButton>

            {user?.partner ? (
               <ControlButton
                  text="Забрать партнера"
                  setState={setShowDeletePartner}
               >
                  <DeletePartnerModal
                     active={showDeletePartner}
                     setActive={setShowDeletePartner}
                  />
               </ControlButton>
            ) : (
               <ControlButton
                  text="Выдать партнера"
                  setState={setShowCreatePartner}
               >
                  <CreatePartnerModal
                     active={showCreatePartner}
                     setActive={setShowCreatePartner}
                  />
               </ControlButton>
            )}
         </div>

         {/* <div className={styles.line}></div> */}
      </div>
   );
};

export default ControlBlock;
