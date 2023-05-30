import Image from 'next/image';
import { ChangeEvent, FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

const PromoInput: FC<
   PropsWithChildren<{
      value: string;
      placeholder: string;
      onChange: (e: string) => void;
   }>
> = ({ value, placeholder, onChange }) => {
   return (
      <div className={styles.input_field}>
         <input
            type="text"
            className={styles.input}
            value={value || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
               onChange(e.target.value)
            }
            placeholder={placeholder}
         />
         <button className={styles.check_promo}>
            <Image src="/svg/check.svg" alt="" width={18} height={16} />
         </button>

         <div className={styles.promo_notfound}>Промокод не найден</div>
      </div>
   );
};

export default PromoInput;
