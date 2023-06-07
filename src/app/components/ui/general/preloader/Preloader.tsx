import Image from 'next/image';
import { FC, PropsWithChildren } from 'react';

interface Props {
   width: number;
   height: number;
}

const Preloader: FC<PropsWithChildren<Props>> = ({ width, height }) => {
   return (
      <>
         <Image
            src="/svg/preloader.svg"
            width={width}
            height={height}
            alt=""
            priority={true}
         />
      </>
   );
};

export default Preloader;
