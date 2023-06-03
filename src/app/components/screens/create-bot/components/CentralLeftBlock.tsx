import { useRef } from 'react';
import styles from '../styles.module.scss';

const CentralLeftBlock = () => {
   const text = useRef<HTMLParagraphElement>(null);

   return (
      <div className={styles.internal_container} data-side="left">
         {/* <Image
            className={styles.chests_image}
            src="/images/gunpowders.png"
            alt=""
            width={390}
            height={380}
         /> */}
         {/* <span className={styles.text_animation} ref={text}></span> */}
      </div>
   );
};

export default CentralLeftBlock;
