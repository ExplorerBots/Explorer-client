import { adminService } from '@/app/services/admin/admin.service';
import { FC, PropsWithChildren, useState } from 'react';
import CrossButton from '../../buttons/CrossButton/CrossButton';
import styles from './ChangeUsernameModal.module.scss';

interface Props {
   id: number;
   username: string;
   setActive: (s: boolean) => void;
   reload: () => void;
}

const ChangeUsernameModal: FC<PropsWithChildren<Props>> = ({
   id,
   username,
   setActive,
   reload,
}) => {
   const [fieldUsername, setFieldUsername] = useState('');

   const changeUsername = async () => {
      const dto = {
         id: +id,
         username: fieldUsername,
      };

      const res = await adminService.changeUsername(dto).then(() => {
         setActive(false);
         reload();
      });
   };

   return (
      <>
         <div className={styles.modal} onClick={() => setActive(false)}>
            <div
               className={styles.modal_content}
               onClick={(e) => e.stopPropagation()}
            >
               <CrossButton setActive={setActive} />
               <div className={styles.title}>Изменить никнейм</div>
               <input
                  className={styles.field}
                  defaultValue={username}
                  type="text"
                  onChange={(e) => setFieldUsername(e.target.value)}
               />
               <button
                  className={styles.submit_button}
                  onClick={() => changeUsername()}
               >
                  Сменить
               </button>
            </div>
         </div>
      </>
   );
};

export default ChangeUsernameModal;
