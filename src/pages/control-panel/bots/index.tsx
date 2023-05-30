import ControlPanelInitalScreen from '@/app/components/screens/control-panel/initial';
import { withAuth } from '@/app/hoc/withAuth';
import { FC } from 'react';

const ControlPanelPage: FC = () => {
   return <ControlPanelInitalScreen />;
};

export default withAuth(ControlPanelPage);
