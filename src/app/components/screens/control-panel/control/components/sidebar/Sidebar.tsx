import { IControlSideBarItem } from '@/app/interfaces';
import { FC, PropsWithChildren } from 'react';
import styles from '../../styles.module.scss';
import Item from './Item';
import Title from './Title';

const Sidebar: FC<
   PropsWithChildren<{
      tabs: IControlSideBarItem[];
      selectedId: number;
      onClick: (id: number) => void;
   }>
> = ({ tabs, selectedId, onClick }) => {
   return (
      <div className={styles.sidebar}>
         <Title />

         <div className={styles.items_container}>
            {tabs.map((item) => (
               <Item
                  id={item.id}
                  onClick={onClick}
                  selected={selectedId === item.id ? true : false}
                  src={item.src}
                  text={item.text}
                  divider={item.divider}
               />
            ))}
         </div>
      </div>
   );
};

export default Sidebar;
