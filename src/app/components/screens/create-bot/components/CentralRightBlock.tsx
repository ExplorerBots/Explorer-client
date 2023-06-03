import { useRef } from 'react';
import styles from '../styles.module.scss';

const CentralRightBlock = () => {
   const text = useRef<HTMLParagraphElement>(null);

   return (
      <div className={styles.internal_container} data-side="right">
         {/* <Image
            className={styles.chests_image}
            src="/images/chests.png"
            alt=""
            width={390}
            height={470}
         /> */}
         {/* <span className={styles.text_animation} ref={text}></span> */}
      </div>
   );
};

export default CentralRightBlock;
