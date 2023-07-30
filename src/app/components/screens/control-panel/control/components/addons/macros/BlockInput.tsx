import styles from '../../../styles.module.scss';

export const BlockInput = ({
   placeholder,
   onChange,
   type,
   value,
   min,
   max,
}: {
   placeholder?: string;
   onChange?: (e: any) => void;
   type?: string;
   value?: string;
   min?: number;
   max?: number;
}) => {
   return (
      <input
         onClick={(e) => e.stopPropagation()}
         className={styles.block_input}
         type={type}
         onChange={onChange}
         value={value}
         min={min}
         max={max}
         placeholder={placeholder}
      />
   );
};
