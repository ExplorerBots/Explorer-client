import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import { IControlSideBarItem } from '@/interfaces';
import { FC, PropsWithChildren } from 'react';
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
            {tabs.map((item, i) => (
               <Item
                  key={i}
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
