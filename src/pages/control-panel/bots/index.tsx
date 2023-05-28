import ControlPanelScreen from '@/app/components/screens/control-panel';
import { withAuth } from '@/app/hoc/withAuth';
import { FC } from 'react';

const ControlPanelPage: FC = () => {
   return <ControlPanelScreen />;
};

export default withAuth(ControlPanelPage);
