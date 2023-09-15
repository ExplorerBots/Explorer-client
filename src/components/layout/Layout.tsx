import { UserContext } from '@/app/UserProvider';
import { NextPage } from 'next';
import { createContext, ReactNode, useContext, useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './footer/Footer';
import Header from './header/Header';
import styles from './Layout.module.scss';

export const NavBrContext = createContext(false);

const Layout: NextPage<{ children: ReactNode }> = ({ children }) => {
   const [showNavBar, setShowNavBar] = useState(false);
   const { isLoading } = useContext(UserContext);

   return (
      <div
         className={styles.wrapper}
         data-overflow={!showNavBar}
         data-blur={isLoading}
      >
         <NavBar state={showNavBar} setState={setShowNavBar} />
         <Header state={showNavBar} setState={setShowNavBar} />
         <div className={styles.page}>{children}</div>
         <Footer />
      </div>
   );
};

export default Layout;
