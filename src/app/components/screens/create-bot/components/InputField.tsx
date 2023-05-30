import { ChangeEvent, FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

const InputField: FC<
   PropsWithChildren<{
      type: string;
      value: string;
      onChange: (e: string) => void;
      placeholder: string;
   }>
> = ({ type, value, onChange, placeholder }) => {
   return (
      <div className={styles.input_field}>
         <input
            type={type}
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
