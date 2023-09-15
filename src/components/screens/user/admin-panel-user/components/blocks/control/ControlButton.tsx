import { FC, PropsWithChildren } from 'react';
import styles from '../../../styles.module.scss';

interface Props {
   text: string;
   setState: (bool: boolean) => void;
}

const ControlButton: FC<PropsWithChildren<Props>> = ({
   text,
   children,
   setState,
}) => {
   return (
      <>
         <button className={styles.enter_button} onClick={() => setState(true)}>
            {text}
         </button>
         {children}
      </>
   );
};

export default ControlButton;
