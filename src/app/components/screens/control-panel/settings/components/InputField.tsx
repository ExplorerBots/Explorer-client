import { useAppSelector } from '@/app/store/hooks';
import { ChangeEvent, FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

const InputField: FC<
   PropsWithChildren<{
      value: string;
      onChange: (e: string) => void;
      placeholder: string;
      botId: number;
   }>
> = ({ value, onChange, placeholder, botId }) => {
   const botSlice = useAppSelector((state) => state.bots);

   return (
      <div className={styles.input_field}>
         <input
            className={styles.input}
            value={value || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
               onChange(e.target.value)
            }
            placeholder={placeholder}
         />
      </div>
   );
};

export default InputField;
