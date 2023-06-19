import { FC, PropsWithChildren, useContext } from 'react';
import { CurrentBotContext } from '../../context/CurrentBotContext';
import styles from '../../styles.module.scss';

const Blur: FC<PropsWithChildren> = () => {
   const { currentBot } = useContext(CurrentBotContext);

   return (
      <>
         {currentBot?.status === 'online' ? (
            <></>
         ) : (
            <div className={styles.blur}></div>
         )}
      </>
   );
};
export default Blur;
