import { routes } from '@/app/constants';
import { UserContext } from '@/app/context/UserContext';
import { useAuth } from '@/app/hooks/useAuth';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, PropsWithChildren, useContext, useRef } from 'react';
import styles from '../styles.module.scss';
import DropdownItem from './DropdownItem';

const Dropdown: FC<
   PropsWithChildren<{ dropdown: boolean; setDropdown: (b: boolean) => void }>
> = ({ dropdown, setDropdown }) => {
   const dropdownRef = useRef(null);

   const { user } = useContext(UserContext);
   const { logout } = useAuth();

   useOutsideClick(dropdownRef, setDropdown);

   return (
      <AnimatePresence>
         {dropdown && (
            <motion.div
               className={styles.dropdown}
               initial={{ y: -20, opacity: 0 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.08 }}
               exit={{ y: -20, opacity: 0 }}
               ref={dropdownRef}
            >
               {user?.role === 'ADMIN' && (
                  <>
                     <DropdownItem
                        href={routes.ADMIN_PANEL + '?act=statistics'}
                        title="Админ панель"
                        onclick={() => setDropdown(false)}
                        state={!dropdown}
                     />
                     <DropdownItem
                        href={routes.PARTNER}
                        title="Партнерка"
                        onclick={() => setDropdown(false)}
                        state={!dropdown}
                     />
                  </>
               )}
               {user?.role === 'PARTNER' && (
                  <DropdownItem
                     href={routes.PARTNER}
                     title="Партнерка"
                     onclick={() => setDropdown(false)}
                     state={!dropdown}
                  />
               )}
               <DropdownItem
                  href={routes.REPLENISH_BALANCE}
                  title="Пополнить баланс"
                  onclick={() => setDropdown(false)}
                  state={!dropdown}
               />
               <DropdownItem
                  href={routes.AUTHORIZE}
                  title="Выйти из аккаунта"
                  onclick={() => {
                     logout();
                     setDropdown(false);
                  }}
               />
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default Dropdown;
