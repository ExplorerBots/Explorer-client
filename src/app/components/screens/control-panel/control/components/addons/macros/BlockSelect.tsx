import styles from '../../../styles.module.scss';

export const BlockSelect = ({
   onChange,
   value,
   options,
}: {
   onChange?: (e: any) => void;
   value?: string;
   options: { key: string; value: string }[];
}) => {
   return (
      <select className={styles.block_select} onChange={onChange} value={value}>
         {options.map((option, i) => (
            <option key={i} value={option.key}>
               {option.value}
            </option>
         ))}
      </select>
   );
};
