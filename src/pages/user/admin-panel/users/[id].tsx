import AdminPanelUserScreen from '@/app/components/screens/user/admin-panel-user';
import { withAuth } from '@/app/hoc/withAuth';
import { FC } from 'react';

const AdminPanelUser: FC = () => {
   return <AdminPanelUserScreen />;
};

export default withAuth(AdminPanelUser);
