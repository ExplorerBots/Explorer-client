import { FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

const Divider: FC<PropsWithChildren<{ text: string; className?: string }>> = ({
   text,
   className,
}) => {
   return (
      <div className={styles.divider}>
         <div className={className ? className : styles.divider_text}>
            {text}
         </div>
      </div>
   );
};
export default Divider;
