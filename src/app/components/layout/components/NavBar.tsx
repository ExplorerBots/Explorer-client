import { routes } from '@/app/constants';
import { useAuth } from '@/app/hooks/useAuth';
import { useAppSelector } from '@/app/store/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import styles from '../Layout.module.scss';

const NavBar: FC<
   PropsWithChildren<{ state: boolean; setState: (state: boolean) => void }>
> = ({ state, setState }) => {
   const userSlice = useAppSelector((state) => state.user);

   const { logout } = useAuth();

   return (
      <>
         {state ? (
            <div className={styles.nav_bar}>
               <div className={styles.link_container}>
                  {userSlice?.data && (
                     <>
                        <div className={styles.username}>
                           {userSlice.data.username}
                        </div>
                        <div className={styles.divider}></div>
                     </>
                  )}
                  <div className={styles.link}>
                     <Link href="/create-bot" onClick={() => setState(false)}>
                        <Image
                           src="/header/user-plus.svg"
                           alt=""
                           width={23}
                           height={23}
                        />
                        Создать бота
                     </Link>
                  </div>
                  <div className={styles.link}>
                     <Link
                        href="/control-panel/bots"
                        onClick={() => setState(false)}
                     >
                        <Image
                           src="/header/control.svg"
                           alt=""
                           width={23}
                           height={23}
                        />
                        Панель управления
                     </Link>
                  </div>
                  <div className={styles.link}>
                     <Link href={routes.HELP} onClick={() => setState(false)}>
                        <Image
                           src="/header/help-circle.svg"
                           alt=""
                           width={23}
                           height={23}
                        />
                        Помощь
                     </Link>
                  </div>
               </div>

               <div className={styles.divider}></div>

               <div className={styles.profile_container}>
                  {userSlice.data ? (
                     <>
                        <div className={styles.link}>
                           <Link
                              href="/replenish-balance"
                              onClick={() => setState(false)}
                           >
                              <Image
                                 src="/header/dollar.svg"
                                 alt=""
                                 width={23}
                                 height={23}
                                 style={{ stroke: 'red' }}
                              />
                              Баланс: {userSlice.data.balance} ₽
                           </Link>
                        </div>
                        <div className={styles.link}>
                           <p
                              onClick={() => {
                                 setState(false);
                                 logout();
                              }}
                           >
                              <Image
                                 src="/header/leave-arrow.svg"
                                 alt=""
                                 width={23}
                                 height={23}
                              />
                              Выйти из аккаунта
                           </p>
                        </div>
                     </>
                  ) : (
                     <>
                        {userSlice.data ? (
                           <button
                              className={styles.account_button}
                              disabled={true}
                           >
                              <Image
                                 src="/svg/preloader.svg"
                                 width={20}
                                 height={20}
                                 alt=""
                              />
                           </button>
                        ) : (
                           <Link
                              href={routes.AUTHORIZE}
                              onClick={() => setState(false)}
                           >
                              <button className={styles.account_button}>
                                 Войти в аккаунт
                              </button>
                           </Link>
                        )}
                     </>
                  )}
               </div>
            </div>
         ) : (
            <></>
         )}
      </>
   );
};

export default NavBar;
