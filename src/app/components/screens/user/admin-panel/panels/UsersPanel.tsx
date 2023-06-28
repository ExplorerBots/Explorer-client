import { routes } from '@/app/constants';
import { adminService } from '@/app/services/admin.service';
import Link from 'next/link';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import styles from '../styles.module.scss';

interface IResponsedUser {
   id: number;
   email: string;
   username: string;
   balance: number;
   role: 'ADMIN' | 'USER' | 'PARTNER';
   createdAt: string;
}

const UsersPanel: FC<PropsWithChildren<unknown>> = () => {
   const [usersList, setUsersList] = useState<IResponsedUser[] | null>(null);
   const [searchTerm, setSearchTerm] = useState({ username: '', email: '' });
   const [searchLimit, setSearchLimit] = useState<number>(10);

   useEffect(() => {
      adminService
         .getUsers({
            email: searchTerm.email,
            username: searchTerm.username,
            limit: searchLimit,
         })
         .then((res) => {
            setUsersList(res);
         });
   }, [searchTerm]);

   useEffect(() => {
      adminService
         .getUsers({
            limit: searchLimit,
         })
         .then((res) => {
            setUsersList(res);
         });
   }, []);

   return (
      <div className={styles.users_panel_container}>
         <div className={styles.filter_block}>
            <div className={styles.block_title}>Фильтры</div>
            <div className={styles.filter_fields}>
               <div className={styles.field}>
                  <div className={styles.title}>Никнейм</div>
                  <input
                     onChange={(e) =>
                        setSearchTerm({
                           ...searchTerm,
                           username: e.currentTarget.value,
                        })
                     }
                     className={styles.input}
                  />
               </div>

               <div className={styles.field}>
                  <div className={styles.title}>Почта</div>
                  <input
                     onChange={(e) =>
                        setSearchTerm({
                           ...searchTerm,
                           email: e.currentTarget.value,
                        })
                     }
                     className={styles.input}
                  />
               </div>
            </div>
         </div>
         <div className={styles.users_block}>
            <div className={styles.block_title}>Пользователи</div>

            <div className={styles.users}>
               {usersList &&
                  usersList.map((user, i) => (
                     <div className={styles.user} key={i}>
                        <div className={styles.line}>
                           <Link
                              className={styles.username}
                              href={routes.ADMIN_PANEL + `users/${user.id}`}
                           >
                              <span className={styles.id}>{user.id}</span>{' '}
                              {user.username}
                           </Link>
                           <div className={styles.role}>{user.role}</div>
                        </div>

                        <div className={styles.line}>
                           <div className={styles.email}>{user.email}</div>
                           <div className={styles.balance}>
                              {user.balance} ₽
                           </div>
                        </div>

                        <div className={styles.line}>
                           <div className={styles.create_data}>
                              Дата регистрации:{' '}
                              {new Date(user.createdAt).toLocaleString()}
                           </div>

                           <Link
                              className={styles.profile_link}
                              href={`/admin-panel/users/${String(user.id)}`}
                           >
                              <button className={styles.enter_button}>
                                 Управление
                              </button>
                           </Link>
                        </div>
                     </div>
                  ))}
            </div>
         </div>
      </div>
   );
};

export default UsersPanel;
