import { UserService } from '@/app/services/user';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { updateUser } from '@/app/store/slices/user';
import { NextPage } from 'next';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import { ReactNode, useEffect } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import styles from './Layout.module.scss';

const Layout: NextPage<{ children: ReactNode }> = ({ children }) => {
   const dispatch = useAppDispatch();
   const userSlice = useAppSelector((state) => state.user);

   useEffect(() => {
      const { authToken } = parseCookies();
      if (authToken) {
         const { email } = UserService.tokenDecode(authToken);
         dispatch(updateUser({ email }));
      }
   }, []);

   return (
      <div className={styles.wrapper}>
         {userSlice.isLoading ? (
            // false
            <div className={styles.preloader}>
               <Image
                  src="/svg/preloader.svg"
                  width={150}
                  height={150}
                  alt=""
               />
            </div>
         ) : (
            <>
               <Header />
               <div className={styles.page}>{children}</div>
               <Footer />
            </>
         )}
      </div>
   );
};

export default Layout;
