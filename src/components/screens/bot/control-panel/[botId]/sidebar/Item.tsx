import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import Image from 'next/image';
import { FC, PropsWithChildren } from 'react';

interface Props {
   divider?: boolean;
   selected?: boolean;
   src: string;
   text: string;
   id: number;
   onClick: (id: number) => void;
}

const Item: FC<PropsWithChildren<Props>> = ({
   src,
   text,
   divider,
   selected,
   onClick,
   id,
}) => {
   return (
      <>
         {divider && <div className={styles.divider}> </div>}
         <div
            className={styles.item}
            data-selected={selected ? 'true' : 'false'}
            onClick={() => onClick(id)}
         >
            <div className={styles.item_svg}>
               <Image
                  src={src}
                  alt=""
                  width={23}
                  height={23}
                  className={styles.title_svg}
               />
            </div>
            <div className={styles.item_text}>{text}</div>
         </div>
      </>
   );
};

export default Item;
