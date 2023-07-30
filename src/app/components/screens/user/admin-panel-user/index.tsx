import { IFullUser } from '@/app/interfaces';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import BotsBlock from './components/blocks/bots/BotsBlock';
import ControlBlock from './components/blocks/control/ControlBlock';
import PartnerBlock from './components/blocks/partner/PartnerBlock';
import PaymentsBlock from './components/blocks/payments/PaymentsBlock';
import UserBlock from './components/blocks/user/UserBlock';
import { UserContext } from './context/UserContext';
import { useGetUser } from './hooks/useGetUser';
import styles from './styles.module.scss';

const AdminPanelUserScreen: FC = () => {
   const { query } = useRouter();

   const [user, setUser] = useState<IFullUser | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

   const { data, isLoading, error } = useGetUser(Number(query.id));

   useEffect(() => data && setUser(data), [data]);

   return (
      <UserContext.Provider value={{ user, setUser }}>
         <div className={styles.main_container}>
            <div className={styles.inner_container}>
               <UserBlock />
               <ControlBlock />
            </div>
            <BotsBlock />
            {user?.partner && <PartnerBlock />}
            <PaymentsBlock />
         </div>
      </UserContext.Provider>
   );
};

export default AdminPanelUserScreen;
