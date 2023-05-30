import Logo from '@/app/components/ui/general/logo/Logo';
import { routes } from '@/app/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import Burger from './components/Burger';
import NavProfile from './components/HeaderProfile';
import styles from './styles.module.scss';

const Header: FC<
   PropsWithChildren<{
      state: boolean;
      setState: (state: boolean) => void;
   }>
> = ({ state, setState }) => {
   const { pathname } = useRouter();

   return (
      <header className={styles.header}>
         <div className={styles.header_container}>
            <Logo />

            <Link href="/create-bot" className={styles.header_link}>
               <Image
                  className={styles.svg}
                  src="/header/user-plus.svg"
                  alt=""
                  width={25}
                  height={25}
               />
               Создать бота
            </Link>
            <Link href="/control-panel/bots" className={styles.header_link}>
               <Image
                  className={styles.svg}
                  src="/header/control.svg"
                  alt=""
                  width={25}
                  height={25}
               />
               Панель управления
            </Link>
            <Link href={routes.HELP} className={styles.header_link}>
               <Image
                  className={styles.svg}
                  src="/header/help-circle.svg"
                  alt=""
                  width={25}
                  height={25}
               />
               Помощь
            </Link>
            <Burger state={state} setState={setState} />
            <NavProfile />
         </div>
      </header>
   );
};

export default Header;
