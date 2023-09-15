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
         {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            // style="margin: auto; background: rgba(255, 255, 255, 0); display: block; shape-rendering: auto;"
            width="200px"
            height="200px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
         >
            <circle
               cx="50"
               cy="50"
               r="32"
               stroke-width="8"
               stroke="#2a2931"
               stroke-dasharray="50.26548245743669 50.26548245743669"
               fill="none"
               stroke-linecap="round"
            >
               <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  values="0 50 50;360 50 50"
               ></animateTransform>
            </circle>
         </svg> */}
      </>
   );
};

export default Preloader;