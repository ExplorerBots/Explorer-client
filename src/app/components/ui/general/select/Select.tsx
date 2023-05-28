import { FC, PropsWithChildren } from 'react';
import styles from './Select.module.scss';

const Select: FC<
   PropsWithChildren<{
      options: string[];
      setValue: (s: string) => void;
   }>
> = ({ options, setValue }) => {
   return (
      <>
         <select
            className={styles.select}
            onChange={(e) => setValue(String(e.target.value))}
         >
            {options.map((option, i) => (
               <option key={i} value={option}>
                  {option}
               </option>
            ))}
         </select>
      </>
   );
};

export default Select;
