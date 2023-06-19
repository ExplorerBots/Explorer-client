import { FC, PropsWithChildren } from 'react';
import styles from '../../styles.module.scss';

export interface Side {
   key: string;
   value: string;
}

interface Props {
   sides: Side[];
   selected: Side;
   setSelected: (selected: Side) => void;
}

const Switcher: FC<PropsWithChildren<Props>> = ({
   sides,
   selected,
   setSelected,
}) => {
   console.log(selected, sides);
   return (
      <div className={styles.switcher}>
         {sides.map((side) => (
            <div
               className={styles.side}
               data-active={selected.key === side.key && true}
               onClick={() => setSelected(side)}
            >
               {side.value}
            </div>
         ))}
      </div>
   );
};
export default Switcher;
