import DefaultModal from '@/components/ui/modals/defaultModal/DefaultModal';
import { FC, PropsWithChildren, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { useChangeUsername } from '../../hooks/useChangeUsername';
import styles from '../../styles.module.scss';

interface Props {
   active: boolean;
   setActive: (bool: boolean) => void;
}

const ChangeUsernameModal: FC<PropsWithChildren<Props>> = ({
   active,
   setActive,
}) => {
   const [username, setUsername] = useState<string>('');
   const { user, setUser } = useContext(UserContext);

   const { changeUsername, isLoading, error } = useChangeUsername();

   const handleSubmit = async () => {
      if (!user) return;

      const response: any = await changeUsername({
         id: user.id,
         username,
      }).catch((err) => console.log(err));

      if (!response) return;

      toast.success(
         `Вы сменили ник ${user.id}, с ${user.username} на ${response.data}`
      );
      setUser({ ...user, username: response.data });
      setActive(false);
   };
   const handleClose = () => {
      setActive(false);
   };
   return (
      <DefaultModal
         active={active}
         loading={isLoading}
         title="Смена ника"
         onSubmit={handleSubmit}
         onClose={handleClose}
      >
         <div className={styles.modal_body}>
            <div className={styles.modal_field}>
               <div className={styles.field_title}>Новый никнейм</div>
               <input
                  type="text"
                  className={styles.input}
                  onChange={(e) => setUsername(e.currentTarget.value)}
               ></input>
            </div>
         </div>
      </DefaultModal>
   );
};

export default ChangeUsernameModal;
