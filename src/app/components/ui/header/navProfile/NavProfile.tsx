import { useAuth } from '@/app/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import LinkItem from './linkItem/LinkItem';
import styles from './NavProfile.module.scss';

const NavProfile: FC = () => {
   const userSlice = useAppSelector((state) => state.user);

   const dispatch = useAppDispatch();
   const router = useRouter();
   const [showProfile, setShowProfile] = useState<boolean>(false);
   const { logout } = useAuth();

   return (
      <div className={styles.profile}>
         {userSlice.isLoading ? (
            <Image
               src="/svg/preloader.svg"
               width={20}
               height={20}
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
                  onClick={() => setShowProfile(!showProfile)}
                  style={showProfile ? {} : {}}
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
                  <Link href="/auth/authorize">Авторизоваться</Link>
               </button>
            </div>
         )}

         <AnimatePresence>
            {showProfile && (
               <motion.div
                  className={styles.items_container}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.08 }}
                  exit={{ y: -20, opacity: 0 }}
               >
                  {userSlice.data?.role === 'ADMIN' && (
                     <LinkItem
                        href="/admin-panel?act=statistics"
                        title="Админ панель"
                        onclick={setShowProfile}
                        state={!showProfile}
                     />
                  )}
                  <LinkItem
                     href="/replenish-balance"
                     title="Пополнить баланс"
                     onclick={setShowProfile}
                     state={!showProfile}
                  />
                  <LinkItem
                     href="/auth/authorize"
                     title="Выйти из аккаунта"
                     onclick={() => {
                        logout();
                        setShowProfile(false);
                     }}
                  />
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default NavProfile;
