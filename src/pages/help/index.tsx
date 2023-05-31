import HelpScreen from '@/app/components/screens/help';
import { withAuth } from '@/app/hoc/withAuth';
import { FC } from 'react';

const HelpPage: FC = () => {
   return <HelpScreen />;
};

export default withAuth(HelpPage);
