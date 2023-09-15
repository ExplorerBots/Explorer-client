'use client';
import { useFetchUser } from '@/hooks/user/admin-panel/users/[id]/useFetchUser';
import { IFullUser } from '@/interfaces';
import { useEffect, useState } from 'react';

import BotsBlock from '@/components/screens/user/admin-panel/users/[id]/blocks/BotsBlock';
import ControlBlock from '@/components/screens/user/admin-panel/users/[id]/blocks/ControlBlock';
import PartnerBlock from '@/components/screens/user/admin-panel/users/[id]/blocks/PartnerBlock';
import PaymentsBlock from '@/components/screens/user/admin-panel/users/[id]/blocks/PaymentsBlock';
import UserBlock from '@/components/screens/user/admin-panel/users/[id]/blocks/UserBlock';
import { UserContext } from './UserContext';
import styles from './_styles.module.scss';

const AdminPanelUserPage = ({ params }: { params: any }) => {
   const [user, setUser] = useState<IFullUser | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

   const { data, isLoading, error } = useFetchUser(Number(params.id));

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

export default AdminPanelUserPage;
