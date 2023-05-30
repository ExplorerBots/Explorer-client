import { UserService } from '@/app/services/user';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { updateUser } from '@/app/store/slices/user';
import { NextPage } from 'next';
import { parseCookies } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './footer/Footer';
import Header from './header/Header';
import styles from './Layout.module.scss';

export const NavBrContext = createContext(false);

const Layout: NextPage<{ children: ReactNode }> = ({ children }) => {
   const [showNavBar, setShowNavBar] = useState(false);

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
      <div className={styles.wrapper} data-overflow={!showNavBar}>
         <NavBar state={showNavBar} setState={setShowNavBar} />
         <Header state={showNavBar} setState={setShowNavBar} />
         <div className={styles.page}>{children}</div>
         <Footer />
      </div>
   );
};

export default Layout;
