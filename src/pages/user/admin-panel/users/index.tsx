import BackButton from '@/app/components/ui/general/buttons/BackButton/BackButton';
import { routes } from '@/app/constants';
import { withAuth } from '@/app/hoc/withAuth';
import { IFullUser } from '@/app/interfaces/index';
import styles from '@/app/styles/admin-panel-users.module.scss';
import Head from 'next/head';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

// export const getStaticProps = async (context: object) => {
//    const users: IFullUser[] = await adminService.getAllUsers();
//    console.log(users);
//    return {
//       props: { users },
//    };
// };

interface UsersProps {
   users: IFullUser[];
}

interface SearchText {
   username: string;
   email: string;
}

const filterUsers = (searchText: SearchText, listOfUsers: IFullUser[]) => {
   if (!searchText) return listOfUsers;
   return listOfUsers.filter(
      ({ username, email }) =>
         username.toLowerCase().includes(searchText.username.toLowerCase()) &&
         email.toLowerCase().includes(searchText.email.toLowerCase())
   );
};

const AdminPanelUsersPage: FC<PropsWithChildren<UsersProps>> = ({ users }) => {
   const [usersList, setUsersList] = useState(users);
   const [searchTerm, setSearchTerm] = useState({ username: '', email: '' });

   useEffect(() => {
      const filteredUsers = filterUsers(searchTerm, users);
      setUsersList(filteredUsers);
   }, [searchTerm]);

   return (
      <>
         <Head>
            <title>EBots - Админ панель</title>
         </Head>

         <div className={styles.container}>
            <BackButton href={routes.ADMIN_PANEL} />

            <div className={styles.search_filter}>
               <div className={styles.text_field}>
                  <label className={styles.label}>Фильтр по нику</label>
                  <input
                     onChange={(e) =>
                        setSearchTerm({
                           username: String(e.target.value),
                           email: searchTerm.email,
                        })
                     }
                     className={styles.input}
                     type="text"
                  />
               </div>
               <div className={styles.text_field}>
                  <label className={styles.label}>Фильтр по почте</label>
                  <input
                     onChange={(e) =>
                        setSearchTerm({
                           username: searchTerm.username,
                           email: String(e.target.value),
                        })
                     }
                     className={styles.input}
                     type="text"
                  />
               </div>
            </div>

            <ul className={styles.users_list}>
               {/* {usersList.map((user) => (
                  <AdminUserItem user={user} key={user.id} />
               ))} */}
            </ul>
         </div>
      </>
   );
};

export default withAuth(AdminPanelUsersPage);
