import AuthorizeScreen from '@/app/components/screens/auth/authorize';
import { withAuth } from '@/app/hoc/withAuth';
import { FC } from 'react';

const AuthorizePage: FC = () => {
   return <AuthorizeScreen />;
};

export default withAuth(AuthorizePage);
