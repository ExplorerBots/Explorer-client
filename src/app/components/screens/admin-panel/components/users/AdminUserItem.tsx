import { IFullUser } from '@/app/interfaces/index';
import { getRoleDescription } from '@/app/utils/role-description';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import styles from '../../styles.module.scss';

interface userProps {
   user: IFullUser;
}

const AdminUserItem: FC<PropsWithChildren<userProps>> = ({ user }) => {
   const createData = new Date(user.createdAt).toLocaleString();
   const roleDescription = getRoleDescription(user.role);

   return (
      <>
         <li className={styles.user}>
            <div className={styles.left_cont}>
               <Link
                  className={styles.username}
                  href={`/admin-panel/users/${String(user.id)}`}
               >
                  <span className={styles.id}>{user.id}</span> {user.username}
               </Link>
               <p className={styles.email}>{user.email}</p>
               <p className={styles.create_data}>
                  Дата регистрации: {createData}
               </p>
            </div>

            <div className={styles.right_cont}>
               <p className={styles.role}>{roleDescription}</p>
               <p className={styles.balance}>{user.balance} ₽</p>

               <Link
                  className={styles.profile_link}
                  href={`/admin-panel/users/${String(user.id)}`}
               >
                  <button className={styles.enter_button}>Управление</button>
               </Link>
            </div>
         </li>
      </>
   );
};

export default AdminUserItem;
