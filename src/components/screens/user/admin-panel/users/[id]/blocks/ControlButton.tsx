import styles from '@/app/user/admin-panel/users/[id]/_styles.module.scss';
import { FC, PropsWithChildren } from 'react';

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
