import { routes } from '@/app/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BlockTitle from '../../../ui/general/blockTitle/BlockTitle';
import styles from '../styles.module.scss';

const NavigationBar = () => {
   const { query } = useRouter();

   const handleClick = () => {
      console.log(1);
   };

   return (
      <div className={styles.navigation_bar}>
         <BlockTitle text="Админ панель" />
         <div className={styles.navigation_content}>
            <Link
               onClick={() => handleClick()}
               className={
                  query.act === 'statistics'
                     ? styles.tab_item_active
                     : styles.tab_item
               }
               href={routes.ADMIN_PANEL + '?act=statistics'}
            >
               Статистика
            </Link>

            <Link
               onClick={() => handleClick()}
               className={
                  query.act === 'users'
                     ? styles.tab_item_active
                     : styles.tab_item
               }
               href={routes.ADMIN_PANEL + '?act=users'}
            >
               Пользователи
            </Link>

            <Link
               onClick={() => handleClick()}
               className={
                  query.act === 'promocodes'
                     ? styles.tab_item_active
                     : styles.tab_item
               }
               href={routes.ADMIN_PANEL + '?act=promocodes'}
            >
               Промокоды
            </Link>
         </div>
      </div>
   );
};

export default NavigationBar;
