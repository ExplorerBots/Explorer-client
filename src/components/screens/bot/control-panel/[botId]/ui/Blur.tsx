import { BotContext } from '@/app/bot/BotProvider';
import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import { FC, PropsWithChildren, useContext } from 'react';

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
