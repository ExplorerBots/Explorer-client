import { routes } from '@/app/constants';
import { useAuth } from '@/app/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import styles from '../styles.module.scss';
import Dropdown from './Dropdown';

const NavProfile: FC = () => {
   const [dropdown, setDropdown] = useState<boolean>(false);

   const userSlice = useAppSelector((state) => state.user);
   const router = useRouter();
   const dispatch = useAppDispatch();
   const { logout } = useAuth();

   return (
      <div className={styles.profile}>
         {userSlice.isLoading ? (
            <Image
               src="/svg/preloader.svg"
               width={40}
               height={40}
               alt=""
               loading="eager"
               priority={true}
               fetchPriority="high"
            />
         ) : userSlice.data ? (
            <>
               <div className={styles.balance_container}>
                  <span className={styles.balance}>
                     {userSlice.data.balance}{' '}
                  </span>
                  <Link
                     href="/replenish-balance"
                     className={styles.btn_replenish}
                  >
                     +
                  </Link>
               </div>
               <div
                  className={styles.profile_container}
                  onMouseUp={() => {
                     !dropdown ? setDropdown(true) : {};
                  }}
               >
                  <div className={styles.info}>
                     <p className={styles.username}>
                        {userSlice.data.username}
                     </p>
                  </div>
               </div>
            </>
         ) : (
            <div className={styles.profile_authorization}>
               <button className={styles.authorization_btn}>
                  <Link href={routes.AUTHORIZE}>Авторизоваться</Link>
               </button>
            </div>
         )}

         <Dropdown dropdown={dropdown} setDropdown={setDropdown} />
      </div>
   );
};

export default NavProfile;
