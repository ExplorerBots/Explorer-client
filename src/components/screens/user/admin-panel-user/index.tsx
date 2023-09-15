'use client';
import { IFullUser } from '@/interfaces';
import { useEffect, useState } from 'react';
import BotsBlock from './components/blocks/bots/BotsBlock';
import ControlBlock from './components/blocks/control/ControlBlock';
import PartnerBlock from './components/blocks/partner/PartnerBlock';
import PaymentsBlock from './components/blocks/payments/PaymentsBlock';
import UserBlock from './components/blocks/user/UserBlock';
import { UserContext } from './context/UserContext';
import { useGetUser } from './hooks/useGetUser';
import styles from './styles.module.scss';

const AdminPanelUserScreen = ({ id }: { id: string }) => {
   const [user, setUser] = useState<IFullUser | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

   const { data, isLoading, error } = useGetUser(Number(id));

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
