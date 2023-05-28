import Head from 'next/head';
import { useRouter } from 'next/router';
import NavigationBar from './components/NavigationBar';
import UsersContent from './components/UsersContent';
import styles from './styles.module.scss';

const AdminPanelScreen = () => {
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
export default AdminPanelScreen;
