import { ChangeEvent, FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

const InputRange: FC<
   PropsWithChildren<{
      value: number;
      onChange: (e: number) => void;
   }>
> = ({ value, onChange }) => {
   return (
      <div className={styles.input_field}>
         <input
            min={5}
            max={30}
            step={5}
            type="range"
            className={styles.input}
            value={value || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
               onChange(Number(e.target.value))
            }
         />
      </div>
   );
};

export default InputRange;
