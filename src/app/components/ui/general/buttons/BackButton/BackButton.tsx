import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import styles from './BackButton.module.scss';

interface hrefProp {
   href: string;
}

const BackButton: FC<PropsWithChildren<hrefProp>> = ({ href }) => {
   return (
      <>
         <Link className={styles.button} href={href}>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="22"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               <line x1="19" y1="12" x2="5" y2="12"></line>
               <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
         </Link>
      </>
   );
};

export default BackButton;
