import styles from '@/app/styles/admin-panel.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';

const AdminPanelPage: FC = () => {
   return (
      <>
         <Head>
            <title>EBots - Админ панель</title>
         </Head>

         <div className={styles.container}>
            <div className={styles.title}>Выбор панели</div>
            <Link href="/admin-panel/users" className={styles.link}>
               Пользователи
            </Link>
            <Link href="/admin-panel/promo" className={styles.link}>
               Промокоды
            </Link>
         </div>
      </>
   );
};

export default AdminPanelPage;
