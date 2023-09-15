import DefaultModal from '@/components/ui/modals/defaultModal/DefaultModal';
import { FC, PropsWithChildren, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { useGiveBalance } from '../../hooks/useGiveBalance';
import { useTakeBalance } from '../../hooks/useTakeBalance';
import styles from '../../styles.module.scss';

interface Props {
   active: boolean;
   setActive: (bool: boolean) => void;
}

const ChangeBalanceModal: FC<PropsWithChildren<Props>> = ({
   active,
   setActive,
}) => {
   const [difference, setDifference] = useState<number>(0);
   const [type, setType] = useState<string>('give');
   const { user, setUser } = useContext(UserContext);
   const { giveBalance, giveLoading } = useGiveBalance();
   const { takeBalance, takeLoading } = useTakeBalance();

   const handleSubmit = async () => {
      if (!user) return;

      if (type === 'give') {
         const response = await giveBalance({
            balanceDifference: difference,
            id: user.id,
         }).catch((err) => console.log(err));

         if (!response) return;

         setUser({ ...user, balance: user.balance + difference });
         toast.success(`Вы дали пользователю ${user.id}, ${difference} рублей`);
         setActive(false);
      } else if (type === 'take') {
         const response = await takeBalance({
            balanceDifference: difference,
            id: user.id,
         }).catch((err) => console.log(err));

         if (!response) return;

         setUser({ ...user, balance: user.balance - difference });
         toast.success(
            `Вы забрали у пользователя ${user.id}, ${difference} рублей`
         );
         setActive(false);
      }
   };
   const handleClose = () => {
      setActive(false);
   };
   return (
      <DefaultModal
         active={active}
         loading={giveLoading || takeLoading}
         title="Смена баланса"
         onSubmit={handleSubmit}
         onClose={handleClose}
      >
         <div className={styles.modal_body}>
            <div className={styles.modal_field}>
               <div className={styles.field_title}>Что сделать</div>
               <select
                  className={styles.input}
                  onChange={(e) => setType(e.currentTarget.value)}
                  defaultValue={type}
               >
                  <option value="give">Дать</option>
                  <option value="take">Забрать</option>
               </select>
            </div>
            <div className={styles.modal_field}>
               <div className={styles.field_title}>Сколько</div>
               <input
                  type="number"
                  className={styles.input}
                  onChange={(e) => setDifference(Number(e.currentTarget.value))}
               />
            </div>
         </div>
      </DefaultModal>
   );
};

export default ChangeBalanceModal;
