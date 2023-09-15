import { UserContext } from '@/app/UserProvider';
import styles from '@/app/user/admin-panel/users/[id]/_styles.module.scss';
import DefaultModal from '@/components/ui/modals/defaultModal/DefaultModal';
import { useCreatePromocode } from '@/hooks/user/admin-panel/users/[id]/useCreatePromocode';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
   active: boolean;
   setActive: (bool: boolean) => void;
}

const CreatePromocodeModal = ({ active, setActive }: Props) => {
   const [code, setCode] = useState<string>('');
   const [type, setType] = useState<string>('discount');
   const [value, setValue] = useState<number>(0);

   const { user, setUser } = useContext(UserContext);
   const { createPromocode, isLoading, error } = useCreatePromocode();

   const handleSubmit = async () => {
      if (!user || !user.partner) return;

      const response: any = await createPromocode({
         type,
         value,
         code,
         partnerId: user.partner.id,
      });

      if (!response) return;

      setUser({
         ...user,
         partner: {
            ...user.partner,
            promocodes: [...user.partner.promocodes, response],
         },
      });

      toast.success('Вы создали промокод');
      setActive(false);
   };
   const handleClose = async () => setActive(false);

   return (
      <DefaultModal
         active={active}
         loading={isLoading}
         title="Создание промокода"
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

export default CreatePromocodeModal;
