import { adminService } from '@/app/services/admin.service';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import CrossButton from '../../buttons/CrossButton/CrossButton';
import styles from './ChangeRoleModal.module.scss';

interface Props {
   id: number;
   role: string;
   setActive: (s: boolean) => void;
   reload: () => void;
}

const ChangeRoleModal: FC<PropsWithChildren<Props>> = ({
   id,
   role,
   setActive,
   reload,
}) => {
   const select = useRef<HTMLSelectElement | any>();
   const [selectedRole, setSelectedRole] = useState('');

   useEffect(() => {
      for (let i = 0; i < select.current!.length; i++) {
         if (select.current![i].value === role) {
            select.current![i].selected = true;
         }
      }
   }, [select]);

   const changeRole = async () => {
      const dto = {
         id: +id,
         role: selectedRole,
      };

      const res = await adminService.changeRole(dto).then(() => {
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
               <div className={styles.title}>Изменить роль</div>
               <select
                  className={styles.select}
                  ref={select}
                  onChange={(e) => setSelectedRole(e.target.value)}
               >
                  <option value="ADMIN">Админ</option>
                  <option value="YOUTUBER">Ютубер</option>
                  <option value="USER">Пользователь</option>
               </select>
               <button
                  className={styles.submit_button}
                  onClick={() => changeRole()}
               >
                  Сменить
               </button>
            </div>
         </div>
      </>
   );
};

export default ChangeRoleModal;
