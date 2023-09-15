import Logo from '@/components/ui/general/logo/Logo';
import { routes } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { FC, PropsWithChildren, useState } from 'react';
import Burger from './components/Burger';
import CreateBotModal from './components/CreateBotModal';
import NavProfile from './components/HeaderProfile';
import styles from './styles.module.scss';

const Header: FC<
   PropsWithChildren<{
      state: boolean;
      setState: (state: boolean) => void;
   }>
> = ({ state, setState }) => {
   // const { pathname } = useRouter();

   const [active, setActive] = useState<boolean>(false);

   return (
      <header className={styles.header}>
         <div className={styles.header_container}>
            <Logo />

            <div onClick={() => setActive(true)} className={styles.header_link}>
               <Image
                  className={styles.svg}
                  src="/header/user-plus.svg"
                  alt=""
                  width={25}
                  height={25}
               />
               Создать бота
            </div>
            <Link href={routes.CONTROL_PANEL} className={styles.header_link}>
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
         <CreateBotModal active={active} setActive={setActive} />
      </header>
   );
};

export default Header;
