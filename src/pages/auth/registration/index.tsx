import RegistrationScreen from '@/app/components/screens/auth/registration';
import { withAuth } from '@/app/hoc/withAuth';
import { FC } from 'react';

const RegistrationPage: FC = () => {
   return <RegistrationScreen />;
};

export default withAuth(RegistrationPage);
