import { FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

const Burger: FC<
   PropsWithChildren<{ state: boolean; setState: (state: boolean) => void }>
> = ({ state, setState }) => {
   return (
      <div className={styles.burger} onClick={() => setState(!state)}>
         <div></div>
         <div></div>
         <div></div>
      </div>
   );
};

export default Burger;
