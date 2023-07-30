import { adminService } from '@/app/services/admin/admin.service';
import { FC, PropsWithChildren, useState } from 'react';
import CrossButton from '../../buttons/CrossButton/CrossButton';
import styles from './TakeBalanceModal.module.scss';

interface Props {
   id: number;
   setActive: (s: boolean) => void;
   reload: () => void;
}

const TakeBalanceModal: FC<PropsWithChildren<Props>> = ({
   id,
   setActive,
   reload,
}) => {
   const [fieldBalance, setFieldBalance] = useState('');

   const takeBalance = async () => {
      const dto = {
         id: id,
         balanceDifference: +fieldBalance,
      };

      await adminService.takeBalance(dto).then(() => {
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
               <div className={styles.title}>Украсть деньги с баланса</div>
               <input
                  className={styles.field}
                  type="number"
                  onChange={(e) => setFieldBalance(e.target.value)}
               />
               <p className={styles.info}>
                  Будет Украдено {fieldBalance ? fieldBalance : 0} ₽
               </p>
               <button
                  className={styles.submit_button}
                  onClick={() => takeBalance()}
               >
                  Украсть
               </button>
            </div>
         </div>
      </>
   );
};

export default TakeBalanceModal;
