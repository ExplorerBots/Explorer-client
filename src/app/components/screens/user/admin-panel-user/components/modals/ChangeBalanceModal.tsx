import DefaultModal from '@/app/components/ui/modals/defaultModal/DefaultModal';
import { FC, PropsWithChildren, useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from '../../styles.module.scss';

interface Props {
   active: boolean;
   setActive: (bool: boolean) => void;
}

const ChangeBalanceModal: FC<PropsWithChildren<Props>> = ({
   active,
   setActive,
}) => {
   // const [loading, setLoading] = useState<boolean>(false);
   const [difference, setDifference] = useState<number>(0);
   const [type, setType] = useState<string>('give');
   const { user, setUser } = useContext(UserContext);

   const handleSubmit = async () => {
      // if (!user) return;
      // type === 'give'
      //    ? await mutateAsync({
      //         balanceDifference: difference,
      //         id: user.id,
      //         type: 'give',
      //      })
      //    : type === 'take' &&
      //      (await mutateAsync({
      //         balanceDifference: difference,
      //         id: user.id,
      //         type: 'take',
      //      }));
   };
   const handleClose = () => {
      setActive(false);
   };
   return (
      <DefaultModal
         active={active}
         loading={false}
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
