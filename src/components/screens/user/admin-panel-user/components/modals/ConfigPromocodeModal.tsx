import DefaultModal from '@/app/components/ui/modals/defaultModal/DefaultModal';
import { FC, PropsWithChildren, useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from '../../styles.module.scss';

interface Props {
   active: boolean;
   setActive: (bool: boolean) => void;
}

const ConfigPromocodeModal: FC<PropsWithChildren<Props>> = ({
   active,
   setActive,
}) => {
   const [code, setCode] = useState<string>('');
   const [type, setType] = useState<string>('discount');
   const [value, setValue] = useState<number>(0);

   const { user, setUser } = useContext(UserContext);

   const handleSubmit = async () => {};
   const handleClose = () => setActive(false);

   return (
      <DefaultModal
         active={active}
         loading={false}
         title="Конфигурация промокода"
         onSubmit={handleSubmit}
         onClose={handleClose}
      >
         <div className={styles.modal_body}>
            <div className={styles.modal_field}>
               <div className={styles.field_title}>Код</div>
               <input
                  type="text"
                  className={styles.input}
                  value={code}
                  onChange={(e) => {
                     setCode(e.currentTarget.value);
                  }}
               />
            </div>

            <div className={styles.modal_field}>
               <div className={styles.field_title}>Значение</div>
               <select
                  className={styles.input}
                  value={type}
                  onChange={(e) => {
                     setType(e.currentTarget.value);
                  }}
               >
                  <option value="discount">Скидка</option>
                  <option value="days">Дни</option>
               </select>
               <input
                  type="number"
                  className={styles.input}
                  placeholder="Сколько"
                  onChange={(e) => {
                     setValue(Number(e.currentTarget.value));
                  }}
               />
            </div>
            <div className={styles.result}>
               Промокод на{' '}
               {type === 'discount' ? `Скидку ${value}%` : `+${value} дней`}
            </div>
         </div>
      </DefaultModal>
   );
};

export default ConfigPromocodeModal;
