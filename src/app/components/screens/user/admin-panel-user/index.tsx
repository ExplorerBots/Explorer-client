import { IFullUser } from '@/app/interfaces';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import BotsBlock from './components/BotsBlock';
import ControlBlock from './components/ControlBlock';
import PartnerBlock from './components/PartnerBlock';
import PaymentsBlock from './components/PaymentsBlock';
import UserBlock from './components/UserBlock';
import { UserContext } from './context/UserContext';
import { useUser } from './hooks/useUser';
import styles from './styles.module.scss';

const AdminPanelUserScreen: FC = () => {
   const { query } = useRouter();

   const [user, setUser] = useState<IFullUser | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

   const { data, isLoading, error } = useUser(Number(query.id));

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
