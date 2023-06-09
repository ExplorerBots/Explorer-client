import axios from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles.module.scss';

const CentralLeftBlock = () => {
   const text = useRef<HTMLParagraphElement>(null);
   const [srcImage, setSrcImage] = useState<string | null>(null);

   useEffect(() => {}, []);

   return (
      <div className={styles.internal_container} data-side="left">
         {/* <Image
            className={styles.chests_image}
            src="/images/gunpowders.png"
            alt=""
            width={390}
            height={380}
         /> */}
         {srcImage && <Image src={srcImage} alt="" width={390} height={380} />}
      </div>
   );
};

export default CentralLeftBlock;
