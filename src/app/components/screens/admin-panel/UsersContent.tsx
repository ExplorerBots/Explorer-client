import { IFullUser } from '@/app/interfaces';
import { useEffect, useState } from 'react';
import AdminUserItem from '../../ui/adminUserItem/AdminUserItem';
import BackButton from '../../ui/general/buttons/BackButton/BackButton';
import styles from './_styles.module.scss';

interface ISearchText {
   username: string;
   email: string;
}

const filterUsers = (searchText: ISearchText, listOfUsers: IFullUser[]) => {
   if (!searchText) return listOfUsers;
   return listOfUsers.filter(
      ({ username, email }) =>
         username.toLowerCase().includes(searchText.username.toLowerCase()) &&
         email.toLowerCase().includes(searchText.email.toLowerCase())
   );
};

const UsersFilter: React.FC = () => {
   const users = [
      {
         id: 12,
         email: 'lerom2008',
         username: 'SapokTapok',
         password: '39457340978yert',
         balance: 2341,
         role: 'USER',
         createdAt: '9345yydtiuy4587',
         updatedAt: '3485983457',
      },
   ];

   const [usersList, setUsersList] = useState(users);
   const [searchTerm, setSearchTerm] = useState({ username: '', email: '' });

   useEffect(() => {
      const filteredUsers = filterUsers(searchTerm, users);
      setUsersList(filteredUsers);
   }, [searchTerm]);

   return (
      <>
         <div className={styles.users_container}>
            <BackButton href="/admin-panel" />

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
               {usersList.map((user) => (
                  <AdminUserItem user={user} key={user.id} />
               ))}
            </ul>
         </div>
      </>
   );
};

export default UsersFilter;
