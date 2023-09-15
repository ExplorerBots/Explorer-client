import AdminPanelScreen from '@/components/screens/user/admin-panel';
import { withAuth } from '@/hoc/withAuth';
import { FC } from 'react';

const AdminPanelPage: FC = () => {
   return <AdminPanelScreen />;
};

export default withAuth(AdminPanelPage);
