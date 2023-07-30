import { FC, PropsWithChildren, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import styles from '../../../styles.module.scss';

interface IUserBlockProps {}

const UserBlock: FC<PropsWithChildren<IUserBlockProps>> = () => {
   const { user } = useContext(UserContext);

   return (
      <div className={styles.user_block}>
         <div className={styles.block_title}>Пользователь</div>
         <div className={styles.information}>
            <div className={styles.field}>
               <div className={styles.key}>Айди</div>
               <div className={styles.value}>{user?.id}</div>
            </div>
            <div className={styles.field}>
               <div className={styles.key}>Никнейм</div>
               <div className={styles.value}>{user?.username}</div>
            </div>
            <div className={styles.field}>
               <div className={styles.key}>Почта</div>
               <div className={styles.value}>{user?.email}</div>
            </div>
            <div className={styles.field}>
               <div className={styles.key}>Баланс</div>
               <div className={styles.value}>{user?.balance} ₽</div>
            </div>
            <div className={styles.field}>
               <div className={styles.key}>Роль</div>
               <div className={styles.value}>{user?.role}</div>
            </div>
            <div className={styles.field}>
               <div className={styles.key}>Зарегестрирован</div>
               <div className={styles.value}>
                  {user?.createdAt &&
                     new Date(user?.createdAt).toLocaleString()}
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserBlock;
