import { adminService } from '@/app/services/admin.service';
import { FC, PropsWithChildren, useState } from 'react';
import CrossButton from '../../buttons/CrossButton/CrossButton';
import styles from './GiveBalanceModal.module.scss';

interface Props {
   id: number;
   setActive: (s: boolean) => void;
   reload: () => void;
}

const GiveBalanceModal: FC<PropsWithChildren<Props>> = ({
   id,
   setActive,
   reload,
}) => {
   const [fieldBalance, setFieldBalance] = useState('');

   const giveBalance = async () => {
      const dto = {
         id: id,
         balanceDifference: +fieldBalance,
      };

      await adminService.giveBalance(dto).then(() => {
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
               <div className={styles.title}>Добавить денег на баланс</div>
               <input
                  className={styles.field}
                  type="number"
                  onChange={(e) => setFieldBalance(e.target.value)}
               />
               <p className={styles.info}>
                  Будет начислено {fieldBalance ? fieldBalance : 0} ₽
               </p>
               <button
                  className={styles.submit_button}
                  onClick={() => giveBalance()}
               >
                  Начислить
               </button>
            </div>
         </div>
      </>
   );
};

export default GiveBalanceModal;
