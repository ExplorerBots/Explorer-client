import { routes } from '@/app/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { sidebarItems } from './data';
import PartnersPanel from './panels/PartnersPanel';
import PromoPanel from './panels/PromoPanel';
import StatisticsPanel from './panels/StatisticsPanel';
import UsersPanel from './panels/UsersPanel';
import styles from './styles.module.scss';

const AdminPanelScreen: FC = () => {
   const router = useRouter();

   const [activeTab, setActiveTab] = useState<number>(sidebarItems[0].id);

   useEffect(() => {
      const activeQuery = router.query.active;
      console.log(activeQuery);
      if (activeQuery) {
         switch (activeQuery) {
            case 'statistics':
               setActiveTab(1);
               break;
            case 'users':
               setActiveTab(2);
               break;
            case 'partners':
               setActiveTab(3);
               break;
            case 'promocodes':
               setActiveTab(4);
               break;
         }
      }
   }, [router.query]);

   useEffect(() => {
      switch (activeTab) {
         case 1:
            router.push(routes.ADMIN_PANEL + '?active=statistics');
            break;
         case 2:
            router.push(routes.ADMIN_PANEL + '?active=users');
            break;
         case 3:
            router.push(routes.ADMIN_PANEL + '?active=partners');
            break;
         case 4:
            router.push(routes.ADMIN_PANEL + '?active=promocodes');
            break;
      }
   }, [activeTab]);

   return (
      <div className={styles.wrapper}>
         <div className={styles.sidebar}>
            <div className={styles.sidebar_title}>Админ панель</div>
            <div className={styles.divider}></div>
            <div className={styles.sidebar_items}>
               {sidebarItems.map((item, i) => (
                  <div
                     key={i}
                     className={styles.item}
                     onClick={() => setActiveTab(item.id)}
                     data-active={activeTab === item.id}
                  >
                     <Image
                        className={styles.item_image}
                        src={item.src}
                        alt=""
                        width={20}
                        height={20}
                     />
                     <div className={styles.item_text}>{item.text}</div>
                  </div>
               ))}
            </div>
         </div>
         <main className={styles.main}>
            {
               {
                  1: <StatisticsPanel />,
                  2: <UsersPanel />,
                  3: <PartnersPanel />,
                  4: <PromoPanel />,
               }[activeTab]
            }
         </main>
      </div>
   );
};

export default AdminPanelScreen;
