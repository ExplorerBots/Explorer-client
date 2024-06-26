import Head from 'next/head';
import { useRouter } from 'next/router';
import NavigationBar from './components/NavigationBar';
import UsersContent from './components/users/UsersContent';
import styles from './styles.module.scss';

const APS = () => {
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
                  <></>
               )}
            </div>
         </div>
      </>
   );
};
export default APS;
