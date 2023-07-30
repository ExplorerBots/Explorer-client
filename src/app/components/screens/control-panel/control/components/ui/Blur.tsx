import { BotContext } from '@/app/context/BotContext';
import { FC, PropsWithChildren, useContext } from 'react';
import styles from '../../styles.module.scss';

const Blur: FC<PropsWithChildren> = () => {
   const { bot } = useContext(BotContext);

   return (
      <>
         {bot?.status === 'online' ? (
            <></>
         ) : (
            <div className={styles.blur}></div>
         )}
      </>
   );
};
export default Blur;
