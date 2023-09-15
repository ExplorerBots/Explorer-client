import AdminPanelUserScreen from '@/components/screens/user/admin-panel-user';
import { withAuth } from '@/hoc/withAuth';

const AdminPanelUser = ({ params }: { params: any }) => {
   return <AdminPanelUserScreen id={params.id} />;
};

export default withAuth(AdminPanelUser);
