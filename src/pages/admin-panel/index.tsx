import AdminPanelScreen from '@/app/components/screens/admin-panel';
import { withAuth } from '@/app/hoc/withAuth';
import { FC } from 'react';

const AdminPanelPage: FC = () => {
   return <AdminPanelScreen />;
};

export default withAuth(AdminPanelPage);
