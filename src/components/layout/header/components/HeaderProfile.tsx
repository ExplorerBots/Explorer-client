import { UserContext } from '@/app/UserProvider';
import { routes } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { FC, useContext, useState } from 'react';
import styles from '../styles.module.scss';
import Dropdown from './Dropdown';

const NavProfile: FC = () => {
   const [dropdown, setDropdown] = useState<boolean>(false);

   const { logout } = useAuth();

   const { user, isLoggedIn } = useContext(UserContext);

   return (
      <div className={styles.profile}>
         {isLoggedIn && user ? (
            <>
               <div className={styles.balance_container}>
                  <span className={styles.balance}>
                     {user.balance.toFixed(1)}{' '}
                  </span>
                  <Link
                     href={routes.REPLENISH_BALANCE}
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
                     <p className={styles.username}>{user.username}</p>
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
