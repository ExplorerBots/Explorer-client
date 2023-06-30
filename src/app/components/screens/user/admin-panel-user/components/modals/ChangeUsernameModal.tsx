import DefaultModal from '@/app/components/ui/modals/defaultModal/DefaultModal';
import { adminService } from '@/app/services/admin.service';
import { FC, PropsWithChildren, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import styles from '../../styles.module.scss';

interface Props {
   active: boolean;
   setActive: (bool: boolean) => void;
}

const ChangeUsernameModal: FC<PropsWithChildren<Props>> = ({
   active,
   setActive,
}) => {
   const [loading, setLoading] = useState<boolean>(false);
   const [username, setUsername] = useState<string>('');
   const { user, setUser } = useContext(UserContext);

   const onSubmit = () => {
      if (!user) return;
      setLoading(true);

      adminService
         .changeUsername({ id: user?.id, username })
         .then((res) => {
            setUser({ ...user, username: res.data });
            toast.success(`Смена ника аккаунту (id${user.id})`);
         })
         .catch((err) => {})
         .finally(() => {
            setLoading(false);
            setActive(false);
         });
   };
   const onClose = () => {
      setActive(false);
   };
   return (
      <DefaultModal
         active={active}
         loading={false}
         title="Смена ника"
         onSubmit={onSubmit}
         onClose={onClose}
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
