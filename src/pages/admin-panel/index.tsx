import NavigationBar from '@/app/components/screens/admin-panel/NavigationBar';
import UsersContent from '@/app/components/screens/admin-panel/UsersContent';
import styles from '@/app/styles/admin-panel.module.scss';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';

const AdminPanelPage: FC = () => {
   const { query } = useRouter();

   return (
      <>
         <Head>
            <title>EBots - Админ панель</title>
         </Head>

         <div className={styles.index_container}>
            <NavigationBar />

            <div className={styles.index_content}>
               {query.act === 'statistics' ? (
                  <p>Статистика</p>
               ) : query.act === 'users' ? (
                  <UsersContent />
               ) : query.act === 'promos' ? (
                  <p>Промокоды</p>
               ) : (
                  <p>Админ панель</p>
               )}
            </div>
         </div>
      </>
   );
};

export default AdminPanelPage;
